# 📁 PersonalAIHub - Complete Folder Structure

## Overview

Everything is now organized in a single `PersonalAIHub` folder with clear separation between frontend and backend.

## Directory Tree

```
C:\SnoopLabs\Labs\PersonalAIHub\
│
├── 📄 README.md                          # Main project overview
├── 📄 START_HERE.md                      # ⭐ Quick 5-minute setup guide
├── 📄 PERSONAL_AI_HUB_COMPLETE.md       # Complete documentation
├── 📄 TESTING_CHECKLIST.md              # Testing instructions
├── 📄 FOLDER_STRUCTURE.md               # This file
│
├── 📂 frontend/                          # React Frontend Application
│   ├── 📄 package.json                  # Frontend dependencies
│   ├── 📄 vite.config.ts                # Vite configuration (proxy to :3001)
│   ├── 📄 tailwind.config.js            # Tailwind CSS config
│   ├── 📄 tsconfig.json                 # TypeScript config
│   ├── 📄 index.html                    # HTML entry point
│   ├── 📄 README.md                     # Frontend readme
│   ├── 📄 SETUP_GUIDE.md                # Detailed setup instructions
│   │
│   ├── 📂 config/                       # ⚙️ Workflow Configurations
│   │   ├── 📄 projects.json            # Your SnoopLabs projects catalog
│   │   └── 📂 tasks/
│   │       └── 📄 logo.json            # Logo creation workflow config
│   │
│   ├── 📂 src/                          # Source Code
│   │   ├── 📄 main.tsx                 # React entry point
│   │   ├── 📄 App.tsx                  # Main app component with routes
│   │   ├── 📄 index.css                # Global styles + Tailwind
│   │   │
│   │   ├── 📂 pages/                   # Page Components
│   │   │   ├── 📄 Dashboard.tsx        # Main landing page
│   │   │   ├── 📄 LogoTask.tsx         # Logo creation workflow page
│   │   │   └── 📄 AgentsPage.tsx       # Agent discovery page
│   │   │
│   │   ├── 📂 components/              # Reusable UI Components
│   │   │   ├── 📄 ToolChecklist.tsx    # Display required tools with install commands
│   │   │   ├── 📄 TaskForm.tsx         # Dynamic form builder from config
│   │   │   └── 📄 PlanDisplay.tsx      # Render AI-generated plans
│   │   │
│   │   ├── 📂 services/                # API & Services
│   │   │   └── 📄 api.ts               # Backend API client
│   │   │
│   │   └── 📂 types/                   # TypeScript Types
│   │       └── 📄 index.ts             # Shared type definitions
│   │
│   └── 📂 public/                       # Static Assets
│       └── 📄 vite.svg                 # Vite logo
│
└── 📂 backend/                          # Node.js Backend API
    ├── 📄 package.json                 # Backend dependencies
    ├── 📄 tsconfig.json                # TypeScript config
    ├── 📄 .env.example                 # Environment template
    ├── 📄 .env                         # ⚠️ Your actual API keys (create this!)
    ├── 📄 README.md                    # Backend readme
    │
    └── 📂 src/                          # Source Code
        ├── 📄 server.ts                # 🚀 Main Express server
        │
        ├── 📂 routes/                  # API Route Handlers
        │   ├── 📄 tasks.ts             # GET/POST /api/tasks endpoints
        │   ├── 📄 agents.ts            # GET /api/agents endpoints
        │   └── 📄 tools.ts             # GET /api/checks/tools endpoint
        │
        └── 📂 services/                 # Business Logic
            ├── 📄 configLoader.ts      # Reads frontend config files
            ├── 📄 llmService.ts        # Claude AI integration
            └── 📄 claudeTemplatesService.ts  # AITMPL agent discovery
```

## Key Locations

### 🎨 Frontend Development
- **Start here**: `frontend/src/pages/Dashboard.tsx`
- **Add components**: `frontend/src/components/`
- **Add pages**: `frontend/src/pages/`
- **Configure workflows**: `frontend/config/tasks/`
- **Run dev server**: From `frontend/` run `npm run dev`

### 🔧 Backend Development
- **Start here**: `backend/src/server.ts`
- **Add routes**: `backend/src/routes/`
- **Add services**: `backend/src/services/`
- **Configure environment**: `backend/.env`
- **Run dev server**: From `backend/` run `npm run dev`

### 📖 Documentation
- **Quick start**: `START_HERE.md` (root)
- **Full guide**: `PERSONAL_AI_HUB_COMPLETE.md` (root)
- **Testing**: `TESTING_CHECKLIST.md` (root)
- **Frontend setup**: `frontend/SETUP_GUIDE.md`
- **Backend setup**: `backend/README.md`

### ⚙️ Configuration Files
- **Workflows**: `frontend/config/tasks/*.json`
- **Projects**: `frontend/config/projects.json`
- **Environment**: `backend/.env`
- **Vite**: `frontend/vite.config.ts`
- **TypeScript**: `*/tsconfig.json`

## Important Files to Know

### Must Create Manually
- ⚠️ `backend/.env` - Add your `ANTHROPIC_API_KEY` here

### Generated by npm install
- `frontend/node_modules/` - Frontend dependencies
- `backend/node_modules/` - Backend dependencies

### Git Ignored
- `*/node_modules/`
- `backend/.env`
- `*/dist/`

## Workflow: Adding a New Task

1. **Create config**: `frontend/config/tasks/your-task.json`
2. **Restart backend**: Backend reads configs on startup
3. **Access in UI**: Navigate to `/tasks/your-task`
4. **Done!** No code changes needed

## Workflow: Adding a New Page

1. **Create page**: `frontend/src/pages/YourPage.tsx`
2. **Add route**: Edit `frontend/src/App.tsx`
3. **Link to it**: Add navigation in other pages
4. **Test**: Visit the route in browser

## Port Configuration

- **Frontend**: http://localhost:5174
- **Backend**: http://localhost:3001
- **Proxy**: Frontend `/api` → Backend `http://localhost:3001/api`

## Environment Variables

### Backend (.env)
```env
ANTHROPIC_API_KEY=your-claude-api-key    # Required
OPENAI_API_KEY=your-openai-key           # Optional
PORT=3001                                 # Default
FRONTEND_URL=http://localhost:5174       # CORS
```

### Frontend
No environment variables needed - proxies to backend via Vite.

## File Naming Conventions

- **React Components**: PascalCase (e.g., `Dashboard.tsx`)
- **Services**: camelCase (e.g., `api.ts`)
- **Config Files**: kebab-case (e.g., `logo.json`)
- **Documentation**: UPPERCASE (e.g., `README.md`)

## Quick Commands Reference

### Frontend
```powershell
cd "C:\SnoopLabs\Labs\PersonalAIHub\frontend"
npm install          # Install dependencies
npm run dev         # Start dev server (port 5174)
npm run build       # Build for production
npm run preview     # Preview production build
```

### Backend
```powershell
cd "C:\SnoopLabs\Labs\PersonalAIHub\backend"
npm install          # Install dependencies
npm run dev         # Start dev server (port 3001)
npm run build       # Compile TypeScript
npm start           # Run compiled code
```

## Size & Complexity

- **Total Files**: ~45 code files
- **Frontend Components**: 3 reusable + 3 pages
- **Backend Routes**: 3 route files
- **Backend Services**: 3 service files
- **Config Files**: 1 projects + 1 logo task (extensible)
- **Documentation**: 7 markdown files

## Clean Architecture

```
Presentation Layer (Frontend)
    ↓
Pages → Components → Services
    ↓
API Layer (HTTP/JSON)
    ↓
Business Logic (Backend)
    ↓
Routes → Services → External APIs
```

## What's Where?

| What | Where |
|------|-------|
| UI Components | `frontend/src/components/` |
| Page Views | `frontend/src/pages/` |
| API Calls | `frontend/src/services/api.ts` |
| Type Definitions | `frontend/src/types/` |
| Workflow Configs | `frontend/config/tasks/` |
| REST Endpoints | `backend/src/routes/` |
| Business Logic | `backend/src/services/` |
| Claude AI Integration | `backend/src/services/llmService.ts` |
| Agent Discovery | `backend/src/services/claudeTemplatesService.ts` |
| Setup Instructions | `START_HERE.md` (root) |

---

**Everything is organized! Start with [`START_HERE.md`](START_HERE.md) to get going.** 🚀

