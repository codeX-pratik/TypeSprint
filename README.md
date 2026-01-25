# TypeSprint ⚡

> **The Ultimate AI-Powered Full-Stack Typing Speed Trainer**

TypeSprint is a modern, high-performance typing application built to help developers and enthusiasts master their keyboarding skills. Unlike traditional typing tests, TypeSprint leverages **Google Gemini AI** for dynamic content and a **MERN Stack** (MongoDB, Express, React, Node.js) for robust performance and global competition.

Built with **React** and **Vite**, featuring a **Glassmorphic UI**, and now powered by a **Node.js/Express Backend** with **MongoDB** for a persistent global leaderboard.

---

## 🌟 Key Features

### 🤖 AI-Powered Content Engine
*   **Never Boring**: Say goodbye to repetitive "The quick brown fox" tests.
*   **Adaptive Content**: Generating content dynamically based on your chosen difficulty.
    *   **Easy**: Simple sentences, common vocabulary.
    *   **Medium**: Standard prose, engaging topics.
    *   **Hard**: Scientific terms, advanced punctuation, and complex sentence structures.
*   **Powered by Gemini**: Directly integrated with Google's Gemini 1.5 Flash model.

### 🏆 Global Leaderboard & Persistence
*   **Global Competition**: Compete with typists around the world. Your scores are saved to a central **MongoDB** database.
*   **Persistent Profiles**: Enter your name once, and track your high scores across sessions.
*   **Pagination**: Browse through thousands of scores easily with our paginated leaderboard view (5 scores per page).
*   **Live Rankings**: View the top scores filtered by difficulty.

### 🎨 Premium User Experience
*   **Glassmorphism**: A modern, translucent design aesthetic.
*   **Dark Mode Native**: Designed for eye comfort during long coding sessions.
*   **Visual Feedback**: Live error highlighting, smooth caret animation, and pulse effects.

### ⚙️ Advanced Configuration
*   **Custom Duration**: Choose standard presets (60s, 90s, 120s) or input any time.
*   **Smart Defaults**: Intelligently suggests time limits based on difficulty.
*   **Practice Mode**: A stress-free environment with no timer.

### 📊 Comprehensive Analytics
*   **Real-Time WPM & Accuracy**: See your updates as you type.
*   **Mistake Breakdown**: Detailed error metrics.
*   **History**: Analyze your performance trends over time.

---

## 🛠️ Technology Stack

This project is a **MERN Stack** application:

*   **Frontend**:
    *   [React 18](https://react.dev/)
    *   [Vite](https://vitejs.dev/) (Build Tool)
    *   [Styled Components](https://styled-components.com/) (CSS-in-JS)
    *   [React Router v6](https://reactrouter.com/)
    *   [Google Generative AI SDK](https://www.npmjs.com/package/@google/generative-ai)

*   **Backend**:
    *   [Node.js](https://nodejs.org/) (Runtime)
    *   [Express](https://expressjs.com/) (API Framework)
    *   [MongoDB](https://www.mongodb.com/) (Database)
    *   [Mongoose](https://mongoosejs.com/) (ODM)

*   **Deployment**:
    *   **Vercel** (Serverless Function + Static Hosting)
    *   [Read the Deployment Guide](docs/DEPLOYMENT_GUIDE.md)

---

## 📂 Project Structure

```bash
TypeSprint/
├── api/                  # Vercel Serverless Adapter
├── client/               # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/   # Reusable UI (NavBar, Footer)
│   │   ├── context/      # Global State (ResultContext)
│   │   ├── pages/        # Views (Home, Setup, Test, Result, Leaderboard)
│   │   └── utils/        # Helpers (Gemini API)
├── server/               # Backend (Node + Express)
│   ├── models/           # Mongoose Schemas (Score.js)
│   └── index.js          # Express Server Entry Point
├── docs/                 # Documentation & Reports
└── vercel.json           # Vercel Deployment Config
```

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   MongoDB (Local running instance OR MongoDB Atlas URI)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/TypeSprint.git
    cd TypeSprint
    ```

2.  **Install All Dependencies**
    We have a helper script to install dependencies for both Client and Server.
    ```bash
    npm run install:all
    ```

3.  **Environment Setup**
    *   **Client**: Create `client/.env`
        ```env
        VITE_GEMINI_API_KEY=your_gemini_api_key
        ```
    *   **Server**: Create `server/.env`
        ```env
        PORT=3000
        MONGODB_URI=mongodb://localhost:27017/typesprint  # OR your Atlas URI
        ```

4.  **Run the App**
    Start both the backend and frontend simultaneously:
    ```bash
    npm start
    ```
    *   Frontend: `http://localhost:5173`
    *   Backend: `http://localhost:3000`

---

## 🎮 Usage Guide

1.  **Setup**: Enter your **Name**, select **Difficulty** and **Time**.
2.  **Test**: Type the AI-generated text.
3.  **Submit**: Upon completion, your score is **automatically submitted** to the global leaderboard.
4.  **Compete**: Check the Leaderboard page to see where you rank!

---

## 🐛 Troubleshooting

*   **"MongoDB Connection Error"**: Ensure MongoDB is running locally or your `.env` string is correct.
*   **"Network Error on Submit"**: Make sure the backend server (port 3000) is running via `npm start`.

---

## 🔮 Future Scope & Roadmap

While TypeSprint is currently a feature-complete application, we have an exciting roadmap for future development:

1.  **Multiplayer Mode**: Real-time 1v1 racing against friends using **WebSockets (Socket.io)**.
2.  **User Authentication**: Robust account system using **JWT/Auth0** to save history across devices.
3.  **Custom Text Upload**: Allowing users to paste their own articles or code snippets to practice.
4.  **Advanced Analytics**: Heatmaps of keyboard usage and specific key weakness analysis.
5.  **Voice Mode**: Dictation typing tests for accessibility and variety.

---
