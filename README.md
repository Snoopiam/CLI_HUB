# Personal AI Hub

**Your Claude Code Optimization Guide** - Get personalized recommendations for skills, agents, MCPs, hooks, and commands based on your task.

---

## What Is This?

Personal AI Hub analyzes your task description and recommends the best Claude Code features to help you work more efficiently. Instead of manually searching through documentation, simply describe what you want to do and get:

- **Agents** - Specialized AI assistants (debugger, code-reviewer, etc.)
- **Skills** - Reusable workflows that Claude activates automatically
- **MCP Servers** - External integrations (GitHub, PostgreSQL, etc.)
- **Hooks** - Lifecycle automation (linting, security, logging)
- **Commands** - Custom slash commands for quick actions
- **Settings** - Optimal configuration recommendations
- **CLAUDE.md** - Project context templates

## Quick Start

### 1. Install Dependencies

```powershell
# Backend
cd "C:\SnoopLabs\Labs\PersonalAIHub\backend"
npm install

# Frontend
cd "C:\SnoopLabs\Labs\PersonalAIHub\frontend"
npm install
```

### 2. Configure Environment

Create `.env` in the backend folder:

```env
ANTHROPIC_API_KEY=your-key-here
PORT=3001
FRONTEND_URL=http://localhost:5174
```

### 3. Start the Servers

**Terminal 1 - Backend:**
```powershell
cd "C:\SnoopLabs\Labs\PersonalAIHub\backend"
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd "C:\SnoopLabs\Labs\PersonalAIHub\frontend"
npm run dev
```

### 4. Open Your Browser

Go to **http://localhost:5174**

---

## How It Works

```
[User Input] --> [Task Analysis] --> [Feature Matching] --> [Recommendations]

1. You describe your task in natural language
   "Build a React dashboard with user authentication"

2. The system analyzes:
   - Keywords: react, dashboard, authentication
   - Categories: web-frontend, security
   - Complexity: moderate

3. Matches to Claude Code features:
   - Agents: react-specialist, security-auditor
   - Skills: webapp-testing
   - MCPs: GitHub MCP
   - Commands: /generate-tests
   - Settings: permissions configuration

4. Returns prioritized recommendations with install commands
```

---

## Features

### Core: Task Analyzer
- Natural language task input
- Real-time keyword detection
- Automatic categorization
- Complexity assessment
- Priority-sorted recommendations

### Feature Types Supported

| Type | Description | Example |
|------|-------------|---------|
| Agents | Specialized AI assistants | `debugger`, `code-reviewer`, `react-specialist` |
| Skills | Auto-activated workflows | `pdf`, `xlsx`, `webapp-testing` |
| MCPs | External integrations | GitHub, PostgreSQL, MongoDB |
| Hooks | Lifecycle automation | Pre-commit lint, security audit |
| Commands | Slash commands | `/generate-tests`, `/review-pr` |
| Settings | Configuration | Permissions, sandbox, model |
| CLAUDE.md | Project context | Structure, conventions, workflows |

### Preserved: Legacy Workflows
- Logo Creation workflow (AI-powered branding)
- Agent browser
- More workflows coming soon

---

## Project Structure

```
PersonalAIHub/
├── frontend/                    # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskAnalyzer.tsx      # Main input component
│   │   │   ├── RecommendationResults.tsx # Results display
│   │   │   ├── ToolChecklist.tsx     # Legacy
│   │   │   ├── TaskForm.tsx          # Legacy
│   │   │   └── PlanDisplay.tsx       # Legacy
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx         # Home page
│   │   │   ├── AnalyzePage.tsx       # Main recommendation flow
│   │   │   ├── LogoTask.tsx          # Legacy workflow
│   │   │   └── AgentsPage.tsx        # Agent browser
│   │   ├── services/
│   │   │   └── api.ts                # Backend API client
│   │   └── types/
│   │       └── index.ts              # TypeScript definitions
│   └── config/
│       └── tasks/
│           └── logo.json             # Legacy workflow config
│
├── backend/                     # Node + Express + TypeScript
│   ├── src/
│   │   ├── routes/
│   │   │   ├── analyze.ts            # Task analysis endpoints
│   │   │   ├── features.ts           # Feature browser endpoints
│   │   │   ├── tasks.ts              # Legacy workflow endpoints
│   │   │   ├── agents.ts             # Legacy agent endpoints
│   │   │   └── tools.ts              # Tool check endpoints
│   │   ├── services/
│   │   │   ├── analyzerService.ts    # Task analysis logic
│   │   │   ├── recommendationService.ts # Feature matching
│   │   │   ├── llmService.ts         # Claude AI integration
│   │   │   └── configLoader.ts       # Config loading
│   │   ├── data/
│   │   │   ├── features.json         # Feature database
│   │   │   └── categories.json       # Task categories
│   │   └── server.ts                 # Express app
│   └── package.json
│
├── ARCHITECTURE_PLAN.md         # Detailed architecture docs
└── README.md                    # This file
```

---

## API Endpoints

### Core (New)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/analyze` | POST | Full task analysis with recommendations |
| `/api/analyze/quick` | POST | Quick analysis (keywords + categories) |
| `/api/analyze/categories` | GET | List all task categories |
| `/api/features` | GET | List all features |
| `/api/features/search` | GET | Search features by keyword |
| `/api/features/:type` | GET | Get features by type |
| `/api/features/:type/:id` | GET | Get specific feature |

### Legacy (Preserved)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/tasks` | GET | List workflows |
| `/api/tasks/:id` | GET | Get workflow details |
| `/api/tasks/:id/plan` | POST | Generate AI plan |
| `/api/agents` | GET | List agents |
| `/api/checks/tools` | GET | Check installed tools |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| AI | Claude 3.5 Sonnet (Anthropic SDK) |
| Data | JSON-based feature database |

---

## Adding New Features

### Add a new feature to the database

Edit `backend/src/data/features.json`:

```json
{
  "agents": [
    {
      "id": "my-new-agent",
      "name": "My New Agent",
      "description": "What it does",
      "whenToUse": "When to use it",
      "installCommand": "How to install",
      "source": "built-in",
      "category": "development",
      "keywords": ["keyword1", "keyword2"]
    }
  ]
}
```

### Add a new task category

Edit `backend/src/data/categories.json`:

```json
{
  "categories": [
    {
      "id": "my-category",
      "name": "My Category",
      "description": "What tasks it covers",
      "keywords": ["keyword1", "keyword2"],
      "defaultFeatures": {
        "agents": ["agent-id"],
        "skills": ["skill-id"]
      }
    }
  ]
}
```

---

## Resources

- **Claude Code Templates CLI**: https://github.com/Snoopiam/claude-code-templates
- **Anthropic Engineering Blog**: https://www.anthropic.com/engineering
- **UI Component Libraries** (for future integration):
  - kokonutui: https://github.com/Snoopiam/kokonutui
  - motion-primitives: https://github.com/Snoopiam/motion-primitives
  - cult-ui: https://github.com/Snoopiam/cult-ui

---

## Roadmap

- [ ] Feature browser page with filtering
- [ ] Setup detection (scan `.claude/` directory)
- [ ] Integrate kokonutui/motion-primitives components
- [ ] AI-enhanced task understanding (use Claude for analysis)
- [ ] Export configuration files
- [ ] Installation status tracking
- [ ] More task categories and features

---

**Built for SnoopLabs** | Powered by Claude Code
