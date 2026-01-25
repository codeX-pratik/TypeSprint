# 🚀 Deployment Guide: TypeSprint on Vercel

Since we have already configured the project with a `vercel.json` and `api/` adapter, the deployment process is very simple.

## Prerequisites
1.  **GitHub Account**: You must have your code pushed to a GitHub repository.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com) using your GitHub account.
3.  **MongoDB Atlas URI**: You need your connection string from MongoDB Cloud.

---

## Step 1: Push to GitHub
If you haven't already, push your code:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

## Step 2: Import to Vercel
1.  Go to your **[Vercel Dashboard](https://vercel.com/dashboard)**.
2.  Click **"Add New..."** -> **"Project"**.
3.  Find your `TypeSprint` repository and click **Import**.

## Step 3: Configure Project
Vercel will detect settings automatically, but check these:
-   **Framework Preset**: It might say `Vite` or `Other`. **Leave it as default**.
-   **Root Directory**: Leave it as `./` (Root).

## Step 4: Environment Variables (CRITICAL) 🔑
Expand the **"Environment Variables"** section and add these:

| Name | Value | Purpose |
| :--- | :--- | :--- |
| `MONGODB_URI` | `mongodb+srv://...` | Your Cloud Database connection string |
| `VITE_GEMINI_API_KEY` | `AIzaSy...` | Your Google Gemini AI Key |

> **Note**: Do *not* add `PORT`. Vercel handles the port automatically.

## Step 5: Deploy
Click **"Deploy"**.

TypeSprint will build (Frontend + Backend) and deploy in about 1 minute.
Once done, you will get a URL like `https://typesprint.vercel.app`.

---

## 🔍 Verification
1.  Open your new URL.
2.  Check the **Leaderboard** to verify the Backend is working (it should fetch empty scores or existing ones).
3.  Start a **Test** to verify the AI Key is working.
