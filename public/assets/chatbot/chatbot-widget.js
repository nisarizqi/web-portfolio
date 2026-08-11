/**
 * chatbot-widget.js
 * ---------------------------------------------------------------
 * Renders and controls the floating chat widget. Depends on
 * nlp-engine.js being loaded first (exposes window.PortfolioNLP).
 *
 * Usage (see demo.html):
 *   <link rel="stylesheet" href="chatbot-widget.css">
 *   <script src="nlp-engine.js"></script>
 *   <script src="chatbot-widget.js"></script>
 *   <script>
 *     PortfolioChatbot.init({
 *       intentsUrl: './intents.json',
 *       botName: "Nisa's Assistant",
 *       greeting: "Hi! Ask me about Nisa's projects, skills, or experience.",
 *       quickReplies: ['Projects', 'Skills', 'Experience', 'Contact'],
 *     });
 *   </script>
 */

(function (global) {
  "use strict";

  const ICON_CHAT = `
    <svg class="pf-icon-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>`;

  const ICON_CLOSE = `
    <svg class="pf-icon-close" style="position:absolute" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>`;

  const ICON_SEND = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>`;

  const DEFAULTS = {
    intentsUrl: "./intents.json",
    botName: "Portfolio Assistant",
    initials: "N",
    greeting: "Hi there! 👋 Ask me about projects, skills, experience, or how to get in touch.",
    quickReplies: ["Projects", "Skills", "Experience", "Contact"],
    typingDelayMs: [500, 1100], // randomized range, feels more natural than a fixed delay
    persistHistory: true,
    storageKey: "pf-chat-history-v1",
  };

  let config = { ...DEFAULTS };
  let matcher = null;
  let elements = {};
  let history = [];

  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else node.setAttribute(k, v);
    });
    children.forEach((c) => {
      if (typeof c === "string") node.appendChild(document.createTextNode(c));
      else if (c) node.appendChild(c);
    });
    return node;
  }

  function buildDom() {
    const root = el("div", { id: "pf-chat-root" });

    const launcher = el(
      "button",
      { class: "pf-launcher", "aria-label": "Open chat", type: "button" },
      Object.assign(el("span"), { innerHTML: ICON_CHAT }),
      Object.assign(el("span"), { innerHTML: ICON_CLOSE }),
      el("span", { class: "pf-launcher-dot", "aria-hidden": "true" })
    );

    const header = el(
      "div",
      { class: "pf-header" },
      el("div", { class: "pf-avatar" }, config.initials),
      el(
        "div",
        { class: "pf-header-text" },
        el("h3", {}, config.botName),
        el("p", {}, el("span", { class: "pf-status-dot" }), "Usually replies instantly")
      )
    );

    const messages = el("div", { class: "pf-messages", role: "log", "aria-live": "polite" });
    const quickReplies = el("div", { class: "pf-quick-replies" });

    const input = el("input", {
      class: "pf-input",
      type: "text",
      placeholder: "Type a message…",
      "aria-label": "Message",
      autocomplete: "off",
    });

    const sendBtn = el(
      "button",
      { class: "pf-send", type: "button", "aria-label": "Send message" },
      Object.assign(el("span"), { innerHTML: ICON_SEND })
    );

    const inputBar = el("div", { class: "pf-input-bar" }, input, sendBtn);
    const windowEl = el("div", { class: "pf-window" }, header, messages, quickReplies, inputBar);

    root.appendChild(windowEl);
    root.appendChild(launcher);
    document.body.appendChild(root);

    elements = { root, launcher, windowEl, messages, quickReplies, input, sendBtn };
  }

  function toggleOpen(forceOpen) {
    const isOpen = elements.root.classList.contains("pf-open");
    const next = forceOpen === undefined ? !isOpen : forceOpen;
    elements.root.classList.toggle("pf-open", next);
    if (next) {
      setTimeout(() => elements.input.focus(), 260);
      scrollToBottom();
    }
  }

  function scrollToBottom() {
    elements.messages.scrollTop = elements.messages.scrollHeight;
  }

  function appendMessage(text, sender) {
    const bubble = el("div", { class: `pf-msg pf-msg-${sender}` }, text);
    elements.messages.appendChild(bubble);
    scrollToBottom();
    history.push({ text, sender, ts: Date.now() });
    persistHistory();
  }

  function showTyping() {
    const typing = el(
      "div",
      { class: "pf-typing", id: "pf-typing-indicator" },
      el("span"),
      el("span"),
      el("span")
    );
    elements.messages.appendChild(typing);
    scrollToBottom();
    return typing;
  }

  function hideTyping(node) {
    if (node && node.parentNode) node.parentNode.removeChild(node);
  }

  function randomDelay() {
    const [min, max] = config.typingDelayMs;
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function renderQuickReplies(labels) {
    elements.quickReplies.innerHTML = "";
    labels.forEach((label) => {
      const chip = el("button", { class: "pf-chip", type: "button" }, label);
      chip.addEventListener("click", () => handleUserMessage(label));
      elements.quickReplies.appendChild(chip);
    });
  }

  function persistHistory() {
    if (!config.persistHistory) return;
    try {
      sessionStorage.setItem(config.storageKey, JSON.stringify(history.slice(-50)));
    } catch (e) {
      /* storage unavailable — fail silently */
    }
  }

  function restoreHistory() {
    if (!config.persistHistory) return false;
    try {
      const raw = sessionStorage.getItem(config.storageKey);
      if (!raw) return false;
      const saved = JSON.parse(raw);
      if (!Array.isArray(saved) || saved.length === 0) return false;
      saved.forEach(({ text, sender }) => {
        const bubble = el("div", { class: `pf-msg pf-msg-${sender}` }, text);
        elements.messages.appendChild(bubble);
      });
      history = saved;
      scrollToBottom();
      return true;
    } catch (e) {
      return false;
    }
  }

  async function handleUserMessage(rawText) {
    const text = (rawText ?? elements.input.value).trim();
    if (!text) return;

    elements.input.value = "";
    elements.quickReplies.innerHTML = "";
    appendMessage(text, "user");

    const typingNode = showTyping();
    elements.sendBtn.disabled = true;

    await new Promise((resolve) => setTimeout(resolve, randomDelay()));

    let result;
    try {
      result = matcher.respond(text);
    } catch (err) {
      result = { text: "Something went wrong on my end — please try again.", isFallback: true };
    }

    hideTyping(typingNode);
    appendMessage(result.text, "bot");
    elements.sendBtn.disabled = false;

    // Keep the conversation going with contextual quick replies
    if (result.isFallback) {
      renderQuickReplies(["Projects", "Skills", "Contact"]);
    }
  }

  function wireEvents() {
    elements.launcher.addEventListener("click", () => toggleOpen());
    elements.sendBtn.addEventListener("click", () => handleUserMessage());
    elements.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleUserMessage();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") toggleOpen(false);
    });
  }

  let initialized = false;

  async function init(userConfig = {}) {
    // Guard against duplicate widgets. This matters because React 18
    // StrictMode double-invokes effects in development, and because this
    // widget injects DOM directly into <body> rather than through React,
    // calling init() twice would otherwise build two #pf-chat-root nodes.
    if (initialized) return;

    const existingRoot = document.getElementById("pf-chat-root");
    if (existingRoot) existingRoot.remove();

    config = { ...DEFAULTS, ...userConfig };

    if (!global.PortfolioNLP) {
      console.error(
        "PortfolioChatbot: nlp-engine.js must be loaded before chatbot-widget.js"
      );
      return;
    }

    buildDom();
    wireEvents();
    initialized = true;

    try {
      matcher = await global.PortfolioNLP.createIntentMatcher(config.intentsUrl);
    } catch (err) {
      console.error("PortfolioChatbot: failed to load intents", err);
      appendMessage(
        "Sorry, I couldn't load my knowledge base right now. Please try again later.",
        "bot"
      );
      return;
    }

    const restored = restoreHistory();
    if (!restored) {
      appendMessage(config.greeting, "bot");
      renderQuickReplies(config.quickReplies);
    }
  }

  function destroy() {
    const existingRoot = document.getElementById("pf-chat-root");
    if (existingRoot) existingRoot.remove();
    elements = {};
    history = [];
    matcher = null;
    initialized = false;
  }

  global.PortfolioChatbot = {
    init,
    destroy,
    open: () => toggleOpen(true),
    close: () => toggleOpen(false),
  };
})(typeof window !== "undefined" ? window : globalThis);