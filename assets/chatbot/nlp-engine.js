/**
 * nlp-engine.js
 * ---------------------------------------------------------------
 * Lightweight, dependency-free client-side NLP engine for intent
 * matching. Runs entirely in the browser — no backend required,
 * which makes it a good fit for a static GitHub Pages site.
 *
 * Pipeline:
 *   1. Preprocess text (lowercase, strip punctuation, tokenize,
 *      remove stopwords)
 *   2. Build a TF-IDF vector space from every pattern in intents.json
 *      at load time
 *   3. For each user message, compute its TF-IDF vector against the
 *      SAME vocabulary/IDF weights, then score it against every
 *      pattern using cosine similarity
 *   4. Return the tag of the best-matching pattern, plus a raw
 *      keyword-overlap score as a secondary signal (helps when a
 *      message uses a keyword that TF-IDF down-weights because it's
 *      common across many patterns, e.g. "flutter")
 *   5. If the combined confidence is below `confidence_threshold`,
 *      fall back to a generic response
 *
 * No external libraries. No network calls. Everything happens
 * synchronously after intents.json is fetched once.
 */

(function (global) {
  "use strict";

  // A small, portfolio-chatbot-appropriate English stopword list.
  // Intentionally keeps domain-relevant short words (e.g. "app", "ai")
  // and only strips grammatical filler.
  const STOPWORDS = new Set([
    "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
    "do", "does", "did", "have", "has", "had", "i", "you", "he", "she",
    "it", "we", "they", "me", "him", "her", "us", "them", "my", "your",
    "his", "its", "our", "their", "to", "of", "in", "on", "at", "for",
    "with", "about", "as", "by", "this", "that", "these", "those",
    "and", "or", "but", "if", "so", "can", "could", "will", "would",
    "should", "what", "how", "please", "tell", "am",
  ]);

  /**
   * Lowercase, strip punctuation, split on whitespace, drop stopwords.
   * @param {string} text
   * @returns {string[]} tokens
   */
  function tokenize(text) {
    if (!text) return [];
    const cleaned = text
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?'"]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    if (!cleaned) return [];

    return cleaned
      .split(" ")
      .filter((tok) => tok.length > 0 && !STOPWORDS.has(tok));
  }

  /** Build a term-frequency map for one token list. */
  function termFrequency(tokens) {
    const tf = {};
    tokens.forEach((tok) => {
      tf[tok] = (tf[tok] || 0) + 1;
    });
    // Normalize by document length so long/short patterns are comparable
    const len = tokens.length || 1;
    Object.keys(tf).forEach((k) => (tf[k] = tf[k] / len));
    return tf;
  }

  /** Cosine similarity between two sparse vectors represented as {term: weight}. */
  function cosineSimilarity(vecA, vecB) {
    let dot = 0;
    let normA = 0;
    let normB = 0;

    for (const term in vecA) {
      normA += vecA[term] * vecA[term];
      if (vecB[term]) dot += vecA[term] * vecB[term];
    }
    for (const term in vecB) {
      normB += vecB[term] * vecB[term];
    }

    if (normA === 0 || normB === 0) return 0;
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  class IntentMatcher {
    /**
     * @param {object} intentsData - parsed intents.json content
     */
    constructor(intentsData) {
      this.meta = intentsData.meta || {};
      this.confidenceThreshold = this.meta.confidence_threshold ?? 0.28;
      this.fallbackResponses = intentsData.fallback_responses || [
        "I'm not sure I understood that — could you rephrase?",
      ];

      // Flatten every (pattern -> tag) pair into one corpus
      this.corpus = []; // [{ tokens, tf, tag, pattern }]
      this.intentsByTag = {};

      intentsData.intents.forEach((intent) => {
        this.intentsByTag[intent.tag] = intent;
        intent.patterns.forEach((pattern) => {
          const tokens = tokenize(pattern);
          this.corpus.push({
            tokens,
            tf: termFrequency(tokens),
            tag: intent.tag,
            pattern,
          });
        });
      });

      this._buildIdf();
      this._vectorizeCorpus();
    }

    /** Compute inverse document frequency across the whole pattern corpus. */
    _buildIdf() {
      const docCount = this.corpus.length;
      const docFreq = {}; // how many patterns contain each term

      this.corpus.forEach(({ tokens }) => {
        const seen = new Set(tokens);
        seen.forEach((term) => {
          docFreq[term] = (docFreq[term] || 0) + 1;
        });
      });

      this.idf = {};
      Object.keys(docFreq).forEach((term) => {
        // Smoothed IDF, avoids division-by-zero and keeps rare terms
        // from completely dominating the score.
        this.idf[term] = Math.log((1 + docCount) / (1 + docFreq[term])) + 1;
      });
    }

    /** Precompute the TF-IDF vector for every pattern once, at load time. */
    _vectorizeCorpus() {
      this.corpus.forEach((doc) => {
        doc.vector = this._tfidfVector(doc.tf);
      });
    }

    /** Convert a term-frequency map into a TF-IDF vector using the trained IDF table. */
    _tfidfVector(tf) {
      const vec = {};
      Object.keys(tf).forEach((term) => {
        const idf = this.idf[term] || 0; // unknown terms contribute 0
        vec[term] = tf[term] * idf;
      });
      return vec;
    }

    /**
     * Secondary signal: raw keyword overlap (Jaccard-style), which
     * helps short queries that TF-IDF alone can under-score.
     */
    _keywordOverlap(queryTokens, patternTokens) {
      if (queryTokens.length === 0 || patternTokens.length === 0) return 0;
      const qSet = new Set(queryTokens);
      const pSet = new Set(patternTokens);
      let intersection = 0;
      qSet.forEach((t) => {
        if (pSet.has(t)) intersection += 1;
      });
      const union = new Set([...qSet, ...pSet]).size;
      return union === 0 ? 0 : intersection / union;
    }

    /**
     * Classify a user message.
     * @param {string} message
     * @returns {{tag: string|null, confidence: number, matchedPattern: string|null, isFallback: boolean}}
     */
    classify(message) {
      const queryTokens = tokenize(message);

      if (queryTokens.length === 0) {
        return { tag: null, confidence: 0, matchedPattern: null, isFallback: true };
      }

      const queryTf = termFrequency(queryTokens);
      const queryVec = this._tfidfVector(queryTf);

      let best = { score: 0, doc: null };

      this.corpus.forEach((doc) => {
        const cosine = cosineSimilarity(queryVec, doc.vector);
        const overlap = this._keywordOverlap(queryTokens, doc.tokens);
        // Blend: cosine similarity carries most of the weight, keyword
        // overlap acts as a stabilizer for very short queries.
        const combined = cosine * 0.75 + overlap * 0.25;

        if (combined > best.score) {
          best = { score: combined, doc };
        }
      });

      const isFallback = best.score < this.confidenceThreshold || !best.doc;

      return {
        tag: isFallback ? null : best.doc.tag,
        confidence: best.score,
        matchedPattern: best.doc ? best.doc.pattern : null,
        isFallback,
      };
    }

    /**
     * Classify a message and return a ready-to-display response string.
     * @param {string} message
     */
    respond(message) {
      const result = this.classify(message);

      if (result.isFallback) {
        return {
          text: this._pickRandom(this.fallbackResponses),
          ...result,
        };
      }

      const intent = this.intentsByTag[result.tag];
      const text = this._pickRandom(intent.responses);
      return { text, ...result };
    }

    _pickRandom(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  }

  /**
   * Convenience loader: fetches intents.json and returns a ready IntentMatcher.
   * @param {string} url - path to intents.json (default: "./intents.json")
   */
  async function createIntentMatcher(url = "./intents.json") {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to load intents file: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return new IntentMatcher(data);
  }

  // Expose to the browser (global) and to CommonJS/Node if ever needed (tests, etc.)
  const api = { IntentMatcher, createIntentMatcher, tokenize, cosineSimilarity };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  } else {
    global.PortfolioNLP = api;
  }
})(typeof window !== "undefined" ? window : globalThis);
