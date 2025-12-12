# TypeSprint ⚡

> **The Ultimate AI-Powered Typing Speed Trainer**

TypeSprint is a modern, high-performance typing application built to help developers and enthusiasts master their keyboarding skills. Unlike traditional typing tests that use static word lists, TypeSprint leverages **Google Gemini AI** to generate unique, context-aware paragraphs for every single session.

Built with **React** and **Vite**, TypeSprint features a stunning **Glassmorphic UI**, a fully responsive design, and a privacy-focused **Local-First** architecture.

![TypeSprint Banner](https://via.placeholder.com/1200x600?text=TypeSprint+Preview) <!-- Replace with actual screenshot path -->

---

## 🌟 Key Features

### 🤖 AI-Powered Content Engine
*   **Never Boring**: Say goodbye to repetitive "The quick brown fox" tests.
*   **Adaptive Content**: Generating content dynamically based on your chosen difficulty.
    *   **Easy**: Simple sentences, common vocabulary, no complex punctuation.
    *   **Medium**: Standard prose, engaging topics, average sentence length.
    *   **Hard**: Complex scientific/technical vocabulary, advanced punctuation, and longer sentences.
*   **Powered by Gemini**: Directly integrated with Google's Gemini 1.5 Flash model for lightning-fast generation.

### 🎨 Premium User Experience
*   **Glassmorphism**: A modern, translucent design aesthetic with background blurs and subtle gradients.
*   **Dark Mode Native**: Designed from the ground up for eye comfort during long coding sessions.
*   **Visual Feedback**:
    *   **Live Error Highlighting**: Incorrect characters turn red instantly.
    *   **Caret Animation**: Smooth, calculated caret movement.
    *   **Pulse Effects**: Subtle animations on buttons and interactions.

### ⚙️ Advanced Configuration
*   **Custom Duration**: Choose standard presets (60s, 90s, 120s) or input **any** custom time (e.g., 45s, 300s).
*   **Smart Defaults**: The app intelligently suggests time limits based on the difficulty you select (e.g., automatically suggesting 120s for Hard mode).
*   **Practice Mode**: A stress-free environment with no timer, allowing you to focus purely on accuracy.

### 📊 Comprehensive Analytics
*   **Real-Time WPM**: See your Words Per Minute update as you type.
*   **Accuracy Tracking**: Precise percentage tracking of your hit rate.
*   **Mistake Breakdown**: See exactly how many characters you missed.
*   **Personal History**: Your best runs are saved locally to your browser's LocalStorage. View your improvement over time on the Leaderboard.

---

## 🛠️ Technology Stack

*   **Core**: [React 18](https://react.dev/)
*   **Build Tool**: [Vite](https://vitejs.dev/) (Super fast HMR)
*   **Styling**: [Styled Components](https://styled-components.com/) (CSS-in-JS)
*   **Routing**: [React Router v6](https://reactrouter.com/)
*   **AI**: [Google Generative AI SDK](https://www.npmjs.com/package/@google/generative-ai)
*   **State Management**: React Context API + Custom Hooks (`useLocalStorage`, `useTimer`)

---

## 📂 Project Structure

```bash
TypeSprint/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Footer.jsx    # Sticky footer
│   │   ├── NavBar.jsx    # Responsive navigation
│   │   └── ...
│   ├── context/          # Global State
│   │   ├── ResultContext # Test results & configuration
│   │   └── ThemeContext  # Theme management
│   ├── hooks/            # Custom React Hooks
│   │   ├── useTimer.js   # Countdown logic
│   │   └── useLocalStorage # Persistence logic
│   ├── pages/            # Main Route Views
│   │   ├── Home.jsx      # Landing Page
│   │   ├── Setup.jsx     # Configuration Dashboard
│   │   ├── Test.jsx      # Core Typing Interface
│   │   ├── Result.jsx    # Analysis Report
│   │   └── Leaderboard   # History View
│   ├── utils/            # Helper Functions
│   │   └── gemini.js     # AI API Integration
│   ├── App.jsx           # Main Layout & Routing
│   └── main.jsx          # Entry Point
├── .env                  # Environment Variables
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18 or higher)
*   npm or yarn

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/TypeSprint.git
    cd TypeSprint
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure API Key**
    *   Get your free API key from [Google AI Studio](https://aistudio.google.com/).
    *   Create a `.env` file in the root directory (copy from `.env.example`).
    ```bash
    cp .env.example .env
    ```
    *   Add your key:
    ```env
    VITE_GEMINI_API_KEY=your_actual_api_key_here
    ```

4.  **Run Locally**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` in your browser.

---

## 🎮 Usage Guide

1.  **Landing**: Click **"Get Started"** to enter the app.
2.  **Setup**:
    *   **Left Panel**: Read the "How to Play" guide.
    *   **Right Panel**: Select your **Time**, **Difficulty**, and **Mode**.
    *   *Tip*: Toggle "Practice" mode to disable the timer.
3.  **Test**:
    *   Type the text shown.
    *   **Green**: Correct.
    *   **Red**: Incorrect.
    *   **Gray**: Pending.
    *   *Note*: You cannot backspace beyond the current word boundaries in some modes (mimicking strict typing tests).
4.  **Results**: View your detailed scorecard.
5.  **Leaderboard**: Check your past top scores. Click **"Clear History"** to reset your data.

---

## 🐛 Troubleshooting

*   **"Gemini API Key missing"**: Ensure you created the `.env` file and restarted the server (`npm run dev`) after adding the key.
*   **"Blank Screen"**: Check the browser console (F12). If you see 404s for imports, try deleting `node_modules` and running `npm install` again.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
