# AI Capstone Project

Capstone project for the Frontend AI Engineering track — built with AI-assisted development workflows using Cursor.

## Stack

- React 19 + TypeScript
- Vite
- React Hook Form + Zod (form validation)

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone https://github.com/<user>/ai-capstone-project.git
cd ai-capstone-project
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Settings Form

The app includes a validated settings form with:

- **Profile** — display name, email, bio
- **Preferences** — theme, language, timezone, notification toggles
- **Security** — optional password change with strength rules

Validation runs on blur and on submit. Password fields are only required when changing the password.

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run preview` | Preview production build |

## Status

In progress — Settings form implemented.
