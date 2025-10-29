# Lumo  
*A minimalist, local-first finance tracker for creatives.*

---

## Overview  
**Lumo** is a lightweight desktop app designed for photographers, freelancers, and creators who want a **clean, animated, and private** way to track their incomes and expenses — no cloud, no subscriptions, no fuss.  

Built using **Tauri**, **React**, **TailwindCSS**, **Framer Motion**, and **SQLite**, Lumo delivers a smooth, flat design experience while keeping all your data stored **locally** on your device.  

---

## Features  
- 🧾 **Track Expenses & Incomes** — Log bills, payments, and balances.  
- 💾 **Offline Storage** — All data saved securely in local SQLite.  
- 🎨 **Flat Design UI** — Elegant and minimal interface with TailwindCSS.  
- 🎞️ **Smooth Animations** — Built with Framer Motion for slick transitions.  
- ⚙️ **Modular Architecture** — Easily extendable modules for new features.  
- 🪶 **Cross-Platform** — Works on Windows, macOS, and Linux.  

---

## Tech Stack  
| Layer | Technology |
|:------|:------------|
| Desktop Shell | [Tauri](https://tauri.app) |
| Frontend | [React](https://react.dev) |
| Styling | [TailwindCSS](https://tailwindcss.com) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Local Database | [SQLite](https://sqlite.org) |

---

## Getting Started  

### Prerequisites  
Make sure you have the following installed:  
- [Node.js](https://nodejs.org/) (v18 or later)  
- [Rust](https://www.rust-lang.org/tools/install) (required for Tauri)  
- [SQLite3](https://sqlite.org/download.html)

---

### Installation  
```bash
# Clone the repository
git clone https://github.com/victor-hermogenes/lumo.git
cd lumo

# Install dependencies
npm install

# Run in development mode
npm run tauri dev
