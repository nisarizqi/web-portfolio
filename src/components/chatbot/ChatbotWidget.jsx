import { useEffect } from "react";

// Loads a <script> only once, even if called again before it finishes
// (e.g. React 18 StrictMode's double-invoked effects in dev mode).
function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      existing.dataset.loaded === "true" ? resolve() : existing.addEventListener("load", resolve);
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

export default function ChatbotWidget() {
  useEffect(() => {
    let cancelled = false;

    if (!document.querySelector('link[href="/assets/chatbot/chatbot-widget.css"]')) {
      const cssLink = document.createElement("link");
      cssLink.rel = "stylesheet";
      cssLink.href = "/assets/chatbot/chatbot-widget.css";
      document.head.appendChild(cssLink);
    }

    loadScriptOnce("/assets/chatbot/nlp-engine.js")
      .then(() => loadScriptOnce("/assets/chatbot/chatbot-widget.js"))
      .then(() => {
        if (cancelled) return;
        window.PortfolioChatbot.init({
          intentsUrl: "/assets/chatbot/intents.json",
          botName: "Nisa's Assistant",
          greeting:
            "Hi! 👋 Ask me about Nisa's projects, skills, experience, or how to reach her.",
          quickReplies: ["Projects", "Skills", "Experience", "Contact"],
        });
      });

    return () => {
      cancelled = true;
      window.PortfolioChatbot?.destroy();
    };
  }, []);

  return null; // the widget injects its own DOM into <body>
}