# PerleKit

**Your personal strategy hub for maximizing earnings on the Perle Labs contributor platform.**

🔗 [Live Demo](https://perlekit.vercel.app) &nbsp;|&nbsp; ⚡ [Start Earning on Perle](https://app.perle.xyz) &nbsp;|&nbsp; 💬 [Join the Discord](https://discord.gg/joinperle)

---

## Overview

PerleKit is a free, browser-based companion tool for contributors on [Perle Labs](https://www.perle.xyz) — a Web3-powered AI data annotation platform built on Solana. No login required. No wallet connection needed. Enter your contributor stats once and the app saves them, turning your data into a personalized strategy dashboard.

---

## The Problem

Perle contributors earn points through daily tasks, streaks, domain expertise, and referrals — but there's no central place to see how all these systems interact. Most contributors leave points on the table simply because they don't know:

- How close they are to the next multiplier threshold
- Which annotation domain pays the most for their background
- How much they're losing by skipping one day
- Where they stand relative to other contributors at their tier

---

## How It Works

1. Open the app and navigate to **Points Calculator**
2. Enter your current streak, daily tasks, and total points — saved automatically
3. Explore all 11 tools — every insight is personalized to your stats in real time

---

## Features

| Tool | What It Does |
|---|---|
| 🔢 Points Calculator | Daily earnings, 7/14/30/60-day projection chart |
| 🔥 Streak Optimizer | Multiplier growth curve, miss-a-day impact, daily reminder |
| 🧠 Domain Matcher | 5-question quiz → your highest-paying annotation domain |
| 📈 Tier Tracker | Current tier, progress to next, all perks unlocked |
| 👥 Referral Estimator | Passive earnings from your referred contributors |
| 📋 Daily Action Plan | Personalized to-do list with point values per task |
| 🏆 Leaderboard Simulator | Estimated rank and percentile among all contributors |
| 💰 Token Tracker | Live Solana price + estimated token value of your points |
| 🌍 Community Benchmarks | How you compare to average contributors at your tier |
| 🗺️ Season Map | Roadmap of Season 1 phases and what's coming next |

---

## Tech Stack

- **React 18** + **TypeScript** — type-safe, component-driven UI
- **React Router v6** — client-side routing, all routes lazy loaded
- **Recharts** — area charts, line charts, bar charts
- **Vite** — fast build tooling with code splitting
- **CSS Modules** — scoped styles, no inline style objects
- **CoinGecko Public API** — free, no-key Solana price feed
- **Web Notifications API** — browser-native streak reminders
- **localStorage** — stats persist between sessions with no backend

---

## Security

- **Zero API keys** — CoinGecko's public endpoint requires no authentication
- **No backend** — all logic runs client-side; no user data ever leaves the browser
- **Content-Security-Policy** headers set in `vercel.json`
- **No tracking, no analytics, no cookies**
- All user stats stored only in their own browser's localStorage

---

## Getting Started

### Prerequisites
- Node.js 20.x (`node -v` to check)
- npm

### Install & Run

```bash
# Clone the repo
git clone https://github.com/yourusername/perlekit.git
cd perlekit

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Push to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. No environment variables required
4. Deploy

---

## Project Structure

```
perlekit/
├── src/
│   ├── components/
│   │   ├── layout/         Header, Sidebar, Dashboard
│   │   ├── calculator/     PointsCalculator, MultiplierDisplay, ProjectionChart
│   │   ├── streak/         StreakOptimizer, StreakGraph
│   │   ├── domain/         DomainMatcher, DomainResult
│   │   ├── tier/           TierTracker
│   │   ├── referral/       ReferralEstimator, ReferralChart
│   │   ├── action/         DailyActionPlan
│   │   ├── leaderboard/    LeaderboardSimulator
│   │   ├── token/          TokenTracker
│   │   ├── benchmarks/     CommunityBenchmarks
│   │   └── season/         SeasonMap
│   ├── services/           tokenPrice.ts (CoinGecko)
│   ├── hooks/              useCalculator, useStreak, useLocalStorage
│   ├── utils/              calculations.ts, domainLogic.ts
│   ├── types/              index.ts (all TypeScript types)
│   ├── styles/             global.css
│   ├── App.tsx             routing only
│   └── main.tsx
├── public/                 favicon.svg
├── .env.example
├── vercel.json             CSP + security headers
└── README.md
```

---

## Known Limitations

- Multiplier thresholds and tier point requirements are based on publicly available information and community estimates. Official values may differ — always check the Perle platform directly.
- Token conversion rate (0.01 tokens per point) is illustrative. The official rate has not been confirmed by Perle Labs.
- Leaderboard rankings are simulated based on tier averages, not live platform data.
- Community benchmarks are estimated values based on typical contributor activity patterns.
- The streak reminder uses browser push notifications — it requires the tab to have been opened at least once and notifications to be permitted.

---

## Contributing

This is a community-built tool. Issues and pull requests are welcome.

---

*Built with ❤️ for the Perle Labs community.*
