# MjolnirAI - Architecture Transformation Plan

## Vision & Mission

**Transform MjolnirAI into a Claude Code Optimization Guide** that helps users get the most out of Claude Code by recommending the right skills, agents, tools, MCPs, hooks, and commands based on their tasks.

## Core Concept: The Gap

```
User Input (Task Description)
         |
         v
   [UNDERSTANDING]
   - Parse task intent
   - Identify domain/category
   - Detect complexity level
   - Extract keywords
         |
         v
   [RECOMMENDATION ENGINE]
   - Match to Claude Code features
   - Prioritize by relevance
   - Check installation status
   - Generate install commands
         |
         v
   [RESULTS DISPLAY]
   - Interactive recommendations
   - Copy-to-clipboard commands
   - Installation guides
   - Usage examples
```

## Feature Categories to Recommend

Based on Anthropic's Claude Code documentation:

| Feature | When to Recommend | Installation |
|---------|------------------|--------------|
| **Skills** | Complex workflows, domain expertise, automatic activation | `.claude/skills/` or `~/.claude/skills/` |
| **Agents** | Specialized tasks, independent context needed | `.claude/agents/` or `~/.claude/agents/` |
| **MCP Servers** | External integrations, databases, APIs | `claude mcp add` |
| **Hooks** | Automation, security policies, logging | `settings.json` |
| **Slash Commands** | Quick shortcuts, explicit invocation | `.claude/commands/` |
| **Settings** | Permissions, sandbox, environment | `settings.json` |
| **CLAUDE.md** | Project context, conventions | Project root |

## Data Structure: Recommendation Database

### Task Categories

```typescript
interface TaskCategory {
  id: string;
  name: string;
  keywords: string[];
  domains: string[];
  complexity: 'simple' | 'moderate' | 'complex';
}

const categories: TaskCategory[] = [
  {
    id: 'web-development',
    name: 'Web Development',
    keywords: ['react', 'vue', 'angular', 'html', 'css', 'frontend', 'backend', 'api'],
    domains: ['frontend', 'backend', 'fullstack'],
    complexity: 'moderate'
  },
  {
    id: 'database',
    name: 'Database & Data',
    keywords: ['sql', 'postgres', 'mysql', 'mongodb', 'redis', 'database', 'query', 'migration'],
    domains: ['database', 'data-engineering'],
    complexity: 'moderate'
  },
  // ... more categories
];
```

### Feature Recommendations

```typescript
interface FeatureRecommendation {
  type: 'skill' | 'agent' | 'mcp' | 'hook' | 'command' | 'setting';
  id: string;
  name: string;
  description: string;
  whenToUse: string;
  installCommand: string;
  relevantTasks: string[];
  priority: number;
  source?: 'built-in' | 'claude-code-templates' | 'custom';
}
```

## UI Components Needed

### From kokonutui
- Cards with animations
- Interactive buttons
- Form inputs
- Modals/dialogs

### From motion-primitives
- Page transitions
- Micro-interactions
- Loading animations
- Result reveals

### From cult-ui
- Copy buttons
- Command palettes
- Badges/tags
- Expandable sections

## Page Structure

### 1. Home/Dashboard
- Hero section with clear value proposition
- Quick task input field
- Popular task shortcuts
- Link to Agents browser
- Link to existing workflows (logo, etc.)

### 2. Task Analyzer (NEW - Core Feature)
- Natural language input for task description
- Smart categorization
- Real-time keyword detection
- "What are you trying to do?" wizard

### 3. Recommendations (NEW - Core Feature)
- Categorized recommendations (Skills, Agents, MCPs, etc.)
- Priority-sorted results
- Installation status indicators
- Copy-to-clipboard commands
- Expandable details
- Usage examples

### 4. Feature Browser (NEW)
- Browse all available features by category
- Filter and search
- Quick install buttons
- Detail views

### 5. Setup Analyzer (NEW)
- Detect current Claude Code setup
- Show installed features
- Gap analysis
- Optimization suggestions

### 6. Existing: Logo Workflow (PRESERVED)
- Keep as "Workflows" section
- Example of guided workflow

### 7. Existing: Agents Page (ENHANCED)
- Integrate with recommendations
- Add install commands from claude-code-templates

## API Endpoints (Backend)

### New Endpoints

```
POST /api/analyze
  Body: { task: string }
  Response: { categories: [], keywords: [], complexity: string }

GET /api/recommendations
  Query: ?task=string&categories=string[]
  Response: { skills: [], agents: [], mcps: [], hooks: [], commands: [] }

GET /api/features
  Query: ?type=skill|agent|mcp|hook|command&category=string
  Response: Feature[]

GET /api/features/:type/:id
  Response: FeatureDetail

GET /api/setup/detect
  Response: { installed: [], missing: [], recommendations: [] }

POST /api/install-command
  Body: { type: string, id: string }
  Response: { command: string, instructions: string }
```

### Preserved Endpoints

```
GET /api/tasks - List workflows (logo, etc.)
GET /api/tasks/:id - Get workflow details
POST /api/tasks/:id/plan - Generate AI plan
GET /api/agents - Browse agents
GET /api/checks/tools - Check installed tools
```

## Implementation Phases

### Phase 1: Core Recommendation Engine
1. Create recommendation database (JSON-based initially)
2. Build task analyzer with keyword extraction
3. Create matching algorithm
4. API endpoints for analysis and recommendations

### Phase 2: UI Transformation
1. Install and configure UI libraries
2. Create new TaskAnalyzer component
3. Create RecommendationResults component
4. Create FeatureBrowser component
5. Update Dashboard with new flow

### Phase 3: Integration
1. Integrate claude-code-templates data
2. Add installation detection
3. Add copy-to-clipboard for all commands
4. Add usage examples and documentation links

### Phase 4: Enhancement
1. AI-powered task understanding (Claude API)
2. Setup analyzer with file system detection
3. Personalized recommendations based on history
4. Export/import configurations

## File Structure (Proposed)

```
MjolnirAI/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                    # Shared UI components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── CopyButton.tsx
│   │   │   │   └── ...
│   │   │   ├── TaskAnalyzer.tsx       # NEW: Task input & analysis
│   │   │   ├── RecommendationCard.tsx # NEW: Single recommendation
│   │   │   ├── RecommendationList.tsx # NEW: Grouped recommendations
│   │   │   ├── FeatureCard.tsx        # NEW: Feature browser card
│   │   │   ├── InstallCommand.tsx     # NEW: Command with copy
│   │   │   ├── SetupStatus.tsx        # NEW: Installation status
│   │   │   ├── TaskForm.tsx           # Existing
│   │   │   ├── ToolChecklist.tsx      # Existing
│   │   │   └── PlanDisplay.tsx        # Existing
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx          # UPDATED: New hero + flow
│   │   │   ├── TaskAnalyzerPage.tsx   # NEW: Main recommendation flow
│   │   │   ├── RecommendationsPage.tsx # NEW: Results page
│   │   │   ├── FeatureBrowserPage.tsx # NEW: Browse all features
│   │   │   ├── SetupPage.tsx          # NEW: Setup analyzer
│   │   │   ├── WorkflowsPage.tsx      # NEW: Container for workflows
│   │   │   ├── LogoTask.tsx           # Existing (preserved)
│   │   │   └── AgentsPage.tsx         # Existing (enhanced)
│   │   ├── data/
│   │   │   ├── categories.json        # NEW: Task categories
│   │   │   ├── skills.json            # NEW: Skills database
│   │   │   ├── agents.json            # NEW: Agents database
│   │   │   ├── mcps.json              # NEW: MCP servers database
│   │   │   ├── hooks.json             # NEW: Hooks examples
│   │   │   └── commands.json          # NEW: Commands database
│   │   ├── services/
│   │   │   ├── api.ts                 # UPDATED: New endpoints
│   │   │   ├── analyzer.ts            # NEW: Task analysis logic
│   │   │   └── recommendations.ts     # NEW: Recommendation logic
│   │   ├── hooks/
│   │   │   ├── useTaskAnalysis.ts     # NEW
│   │   │   ├── useRecommendations.ts  # NEW
│   │   │   └── useSetupDetection.ts   # NEW
│   │   └── types/
│   │       └── index.ts               # UPDATED: New types
│   └── config/
│       ├── projects.json              # Existing
│       └── tasks/
│           └── logo.json              # Existing
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── tasks.ts               # Existing
│   │   │   ├── agents.ts              # Existing
│   │   │   ├── tools.ts               # Existing
│   │   │   ├── analyze.ts             # NEW: Task analysis
│   │   │   ├── recommendations.ts     # NEW: Recommendations
│   │   │   ├── features.ts            # NEW: Feature browser
│   │   │   └── setup.ts               # NEW: Setup detection
│   │   ├── services/
│   │   │   ├── configLoader.ts        # Existing
│   │   │   ├── llmService.ts          # Existing
│   │   │   ├── claudeTemplatesService.ts # Existing (enhanced)
│   │   │   ├── analyzerService.ts     # NEW: Task analysis
│   │   │   ├── recommendationService.ts # NEW: Matching logic
│   │   │   └── setupDetectorService.ts # NEW: Detect installations
│   │   ├── data/
│   │   │   ├── features.json          # NEW: All features database
│   │   │   └── mappings.json          # NEW: Task-to-feature mappings
│   │   └── server.ts                  # UPDATED: New routes
└── docs/
    └── ARCHITECTURE_PLAN.md           # This file
```

## Technology Stack

### Frontend
- React 18 + TypeScript + Vite (existing)
- Tailwind CSS (existing)
- **NEW**: kokonutui components
- **NEW**: motion-primitives animations
- **NEW**: cult-ui patterns
- **NEW**: Framer Motion (dependency of above)

### Backend
- Node.js + Express + TypeScript (existing)
- Anthropic SDK (existing)
- **NEW**: File system detection for setup analysis

## Success Criteria

1. User can describe any task in natural language
2. System provides relevant Claude Code feature recommendations
3. Each recommendation includes:
   - What it does
   - When to use it
   - How to install it (copy-ready command)
   - Usage examples
4. UI is modern, interactive, and visually appealing
5. Existing logo workflow is preserved and accessible
6. Integration with claude-code-templates for expanded recommendations

## Next Steps

1. Review and approve this architecture
2. Install UI dependencies
3. Create recommendation database
4. Build new components
5. Update routing and pages
6. Test and iterate
