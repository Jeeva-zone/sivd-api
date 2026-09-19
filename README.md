# ✦ SIVD API

A clean, responsive web interface for exploring and testing the SIVD API catalogue, with a dedicated AI chatbot powered by Gemini and DeepSeek through the upstream Rebix API service.

## 🌐 Live Pages

### 📚 SIVD API Catalogue
Browse the available API routes, search endpoints, switch categories, and try supported requests directly from the browser.

🔗 **https://jeeva-zone.github.io/sivd-api/**

### 🤖 SIVD Chatbot
Chat with **Gemini** or **DeepSeek V3** using a simple, responsive chat interface.

🔗 **https://jeeva-zone.github.io/sivd-api/chatbot/**

## ✨ Features

### 📡 API Catalogue
- 🤖 AI APIs
- 📥 Downloader APIs
- 🔎 Search APIs
- 🎌 Anime APIs
- 🕵️ Stalk APIs
- 🛠️ Tool APIs
- 🔞 NSFW APIs
- 🧰 Extra Tool APIs
- 🎲 Random APIs
- 🖼️ Image APIs
- 🔍 API search and category filtering
- ▶️ Built-in **Try API** interface
- 📤 File upload testing where supported
- 🧪 AI limit & availability probing
- 🌙 Light / dark theme

### 🤖 AI Chatbot
- 💎 Gemini support
- 🧠 DeepSeek V3 support
- 🔄 One-click provider switching
- 💬 Conversation-style chat
- 🆕 New Chat / reset
- 💾 Session-based conversation history
- ⏱️ Response latency display
- 📱 Responsive mobile layout
- 🌙 Light / dark theme
- ⚠️ Clear HTTP and CORS error handling

## 🎨 Design

- ✦ SIVD-branded interface
- 💜 Soft purple accent
- 📱 Responsive mobile-friendly layout
- 🖥️ Desktop-friendly UI
- 🌙 Dark mode support
- ⌨️ Keyboard-friendly interactions
- ✨ Lightweight static GitHub Pages frontend

## 🧩 Upstream API

The frontend currently uses the upstream service:

`https://api-rebix.vercel.app`

The API service can change independently. Individual routes may become unavailable, rate-limited, renamed, or return different response formats.

The chatbot currently uses:

- Gemini → `/api/gemini?q=...`
- DeepSeek V3 → `/api/deepseek-v3?q=...`

Because the GitHub Pages chatbot sends requests directly from the browser, its operation depends on the upstream API allowing cross-origin (CORS) requests.

## 🚀 GitHub Pages

This repository publishes the static site from the `docs/` directory.

Main catalogue:

**https://jeeva-zone.github.io/sivd-api/**

Chatbot:

**https://jeeva-zone.github.io/sivd-api/chatbot/**

## 🛠️ Development

The repository contains the GitHub Pages frontend under `docs/`.

For local development, serve the `docs/` directory with any static web server.

Example:

```bash
python -m http.server 8080 --directory docs
```

Then open:

`http://localhost:8080/`

## ⚠️ Important

This project is a frontend interface for upstream APIs. Availability, limits, response formats, and access policies are controlled by the upstream service and can change without notice.

Built for the **SIVD ecosystem**. ✦
