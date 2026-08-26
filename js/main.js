/* ============================================
   Tobi — The Best AI Assistant
   Vanilla JavaScript. No frameworks, no build step.
   ============================================ */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initSkillChips();
  initStatCounters();
  initScrollReveal();
  initChat();
  document.getElementById("year").textContent = new Date().getFullYear();
});

/* ---------- Skill chips (rendered from data) ---------- */
const SKILLS = [
  "💻 Code & Refactor", "🖥️ Terminal Commands", "🌐 Web Research",
  "📁 File Management", "🐙 GitHub & PRs", "📊 Spreadsheets",
  "📝 Documents & Docs", "📅 Calendar", "📧 Email", "🔍 Deep Analysis",
  "⏰ Scheduled Jobs", "🧩 Skill Creation", "🛠️ Debugging",
  "🧪 Testing", "📈 Data Visualization", "🤖 Multi-Agent Teams",
  "🌍 Browser Automation", "🔐 Security Review", "📚 Documentation",
  "🎨 Design Mockups"
];

function initSkillChips() {
  const wrap = document.getElementById("skillChips");
  if (!wrap) return;
  SKILLS.forEach((skill, i) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = skill;
    chip.style.transitionDelay = `${i * 45}ms`;
    wrap.appendChild(chip);
  });
  // Animate them in when the section scrolls into view
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        wrap.querySelectorAll(".chip").forEach((c) => c.classList.add("show"));
        io.disconnect();
      }
    });
  }, { threshold: 0.2 });
  io.observe(wrap);
}

/* ---------- Animated stat counters ---------- */
function initStatCounters() {
  const nums = document.querySelectorAll(".stat-num");
  if (!nums.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateNumber(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.6 });
  nums.forEach((el) => io.observe(el));
}

function animateNumber(el) {
  const target = parseInt(el.dataset.target, 10) || 0;
  const duration = 1200;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ---------- Scroll reveal for cards / FAQ ---------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((el) => io.observe(el));
}

/* ---------- Offline chat playground ---------- */
const TOBI_RESPONSES = [
  { match: /hello|hi|hey/i, reply: "Hey there! 👋 Great to meet you. What can I build for you today?" },
  { match: /what can you do|help|features/i, reply: "I execute real work: code, files, research, automation, scheduling — and I verify everything before I claim it's done. This page is just a demo, though!" },
  { match: /who (made|built|created) you/i, reply: "I was built by Trinketronix LLC — a Michigan-based company doing custom software and hardware. I run on the open-source Hermes Agent framework." },
  { match: /best|great|awesome|amazing/i, reply: "Appreciated! 😎 I just do the work and deliver real results — that's the whole trick." },
  { match: /joke/i, reply: "Why do programmers prefer dark mode? Because light attracts bugs. 🐛 (And yes, I test in both.)" },
  { match: /weather/i, reply: "I can't check live weather in this offline demo — the real Tobi can, though. Try asking about my features instead!" },
  { match: /music|guitar|album/i, reply: "Fun fact: my creator Hector is also 'Todd Salpen' — a hard rock guitarist and electronic musician with 10 albums! 🎸" },
  { match: /thank/i, reply: "Anytime! That's what I'm here for. 🚀" },
  { match: /bye|goodbye/i, reply: "See you around! Remember: I'm always here when you need real work done. 👋" }
];

function initChat() {
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatText");
  const chat = document.getElementById("chat");
  if (!form || !input || !chat) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addMessage(chat, text, "user");
    input.value = "";
    const reply = getTobiReply(text);
    typeTobiReply(chat, reply);
  });
}

function getTobiReply(text) {
  for (const { match, reply } of TOBI_RESPONSES) {
    if (match.test(text)) return reply;
  }
  return "Good question! This offline demo only knows a few canned answers — the real Tobi has a full toolset and never runs out of answers. 😉";
}

function addMessage(chat, text, who) {
  const msg = document.createElement("div");
  msg.className = `msg msg-${who}`;
  const bubble = document.createElement("div");
  bubble.className = "msg-bubble";
  bubble.textContent = text;
  msg.appendChild(bubble);
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function typeTobiReply(chat, reply) {
  const msg = document.createElement("div");
  msg.className = "msg msg-tobi";
  const bubble = document.createElement("div");
  bubble.className = "msg-bubble typing";
  msg.appendChild(bubble);
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;

  let i = 0;
  const speed = 14; // ms per character
  const timer = setInterval(() => {
    bubble.textContent = reply.slice(0, i);
    i++;
    chat.scrollTop = chat.scrollHeight;
    if (i > reply.length) {
      clearInterval(timer);
      bubble.classList.remove("typing");
    }
  }, speed);
}
