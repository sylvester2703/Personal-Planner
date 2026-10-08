# SPPU AI&DS ExamOS & Personal Life Management System 🎓🚀

A deterministic academic operating system and personal life management web application tailored for a **Final Year (BE) Artificial Intelligence & Data Science (AI&DS)** student at **Savitribai Phule Pune University (SPPU, 2019 Pattern)**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsylvester2703%2FPersonal-Planner)

---

## 🌟 Core Features

### 1. 📅 57-Day Deterministic Academic Timeline
- Complete continuous schedule covering **October 08, 2026 to December 03, 2026**.
- Phase tracking: `FOUNDATION`, `MOCKS`, `SUBMISSIONS`, `PRACTICALS`, `INTENSIVE`, `EXAM_BUFFER`.
- Day auditing and automatic backlog rollover & redistribution into upcoming free slots.

### 2. ⏰ 4x Daily Automated WhatsApp Briefing Daemon
- **08:00 AM**: Morning Briefing & Daily Target Blueprint
- **02:00 PM**: Midday Study & Internship Sync
- **07:30 PM**: Evening Deep Work Sprint & Numerical Derivations
- **11:00 PM**: Night Audit, Backlog Check & Tomorrow Preparation
- Includes audio synth chime, desktop HTML5 notification, and 1-click fallback buttons.

### 3. 📂 SPPU Previous Year Question Papers (PYQ) Vault
Direct access to official university question papers & solution keys on Google Drive:
- **Machine Learning (ML)** — Course 417521
- **Data Mining & Visualization (DMV)** — Course 417522
- **Bioinformatics (BIF)** — Course 417523
- **Information Retrieval (IR)** — Course 417524

### 4. 📚 Unit 3–6 Syllabus & KaTeX Mathematical Question Vault
- Complete SPPU 2019 pattern End-Sem syllabus breakdown for all 4 core subjects.
- KaTeX mathematical equations and derivations (AdaBoost, PageRank, TF-IDF, Single-Link Clustering, Gini Impurity, etc.).
- Step-by-step model solutions with university examiner scoring criteria.

### 5. 🧘 Personal Life & Routine Calendar
- Manage fitness, prayer, internship dev sprints, college formalities, habits, and meetings.
- Month, Week, Day, and Stream view modes with 1-click WhatsApp reminders.

### 6. ⏱️ Focus Engine & Readiness Telemetry
- Integrated Pomodoro & Stopwatch timers linked directly to daily scheduled subtasks.
- Subject-wise progress bars, unit mastery index, and exam readiness burndown metrics.
- Built-in Dark Mode and Light Mode theme support with zero external database dependencies (100% LocalStorage hydration).

---

## 🛠️ Tech Stack
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with CSS variables
- **Icons**: [Lucide React](https://lucide.dev/)
- **Mathematics**: [KaTeX](https://katex.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with LocalStorage persistence
- **Animation & Confetti**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/sylvester2703/Personal-Planner.git
cd Personal-Planner

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploy to Vercel (Zero-Config)

1. Fork or push this repository to your GitHub account (`sylvester2703/Personal-Planner`).
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Select **Import Git Repository** and choose `sylvester2703/Personal-Planner`.
4. Leave all build settings as default (Framework Preset: **Next.js**).
5. Click **Deploy**! 🚀
