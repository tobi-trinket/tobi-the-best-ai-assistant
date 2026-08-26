# 🤖 Tobi — The Best AI Assistant

A promotional website for **Tobi**, an AI assistant built by **Trinketronix LLC**.
The site introduces Tobi's core traits (direct, honest, action-oriented), showcases
its skill arsenal, includes a small offline chat playground, and answers FAQs.

## ✨ Highlights

- **Hero section** with animated gradient headline, floating orbs, and counting stats
- **Features grid** describing Tobi's operating principles
- **Skills section** with chips that animate in on scroll (rendered from a JS data array)
- **Interactive chat demo** — a tiny offline "ask Tobi" experience with typed replies
- **FAQ accordion** built with native `<details>` elements
- **Scroll-reveal animations** via `IntersectionObserver`
- Fully responsive, dark theme, sticky blurred navigation

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic, accessible) |
| Styling | Pure CSS (custom properties, animations, no framework) |
| Logic | Vanilla JavaScript (ES6+, no libraries, no build step) |

**Deliberately simple:** no Node.js, no bundlers, no dependencies.
Open the site directly in a browser or serve it statically.

## 🚀 Getting Started

Just open the file:

```bash
# Option A — open directly
open index.html          # macOS
xdg-open index.html      # Linux

# Option B — serve statically (optional)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 📁 Project Structure

```
tobi-the-best-ai-assistant/
├── index.html        # Single-page site (hero, features, skills, playground, FAQ)
├── css/
│   └── style.css     # All styles: theme tokens, layout, animations
├── js/
│   └── main.js       # Skill chips, stat counters, scroll reveal, chat demo
└── README.md         # This file
```

## 🔧 Customization

- **Colors & theme:** edit the CSS variables at the top of `css/style.css` (`:root` block).
- **Skills list:** edit the `SKILLS` array in `js/main.js`.
- **Chat answers:** edit `TOBI_RESPONSES` in `js/main.js` (regex `match` → `reply`).
- **Content:** all copy lives in `index.html`.

## 📄 License

© Trinketronix LLC. All rights reserved.

---

Built by Trinketronix LLC · [trinketronix.com](https://trinketronix.com)
