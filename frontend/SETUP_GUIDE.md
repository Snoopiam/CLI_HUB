# My Project Hub - Setup Guide

Welcome to your Personal AI Project Hub! This guide will walk you through setting up both the frontend and backend.

## Prerequisites

✅ **Node.js LTS** (v18 or higher) - Check with `node --version`  
✅ **npm** or **pnpm** - Check with `npm --version`  
✅ **Claude API Key** from [anthropic.com](https://anthropic.com)

## Quick Start

### Step 1: Install Frontend Dependencies

```powershell
cd "C:\SnoopLabs\Labs\Mjölnir\frontend"
npm install
```

### Step 2: Install Backend Dependencies

```powershell
cd "C:\SnoopLabs\Labs\Mjölnir\backend"
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the backend directory:

```powershell
cd "C:\SnoopLabs\Labs\Mjölnir\backend"
Copy-Item .env.example .env
```

Then edit `.env` and add your API keys:

```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
OPENAI_API_KEY=sk-your-openai-key-here  # Optional
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5174
```

### Step 4: Start the Backend Server

In a **new terminal**:

```powershell
cd "C:\SnoopLabs\Labs\Mjölnir\backend"
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:3001
📊 Health check: http://localhost:3001/health
```

### Step 5: Start the Frontend

In **another terminal**:

```powershell
cd "C:\SnoopLabs\Labs\Mjölnir\frontend"
npm run dev
```

You should see:
```
  ➜  Local:   http://localhost:5174/
```

### Step 6: Open Your Browser

Navigate to **http://localhost:5174** and you're ready to go!

## Installing AITMPL/Claude Code Templates (Optional but Recommended)

The hub will recommend installing the Claude Code Templates CLI for enhanced capabilities:

```powershell
npm install -g claude-code-templates
```

Or run it directly without installing:

```powershell
npx claude-code-templates@latest
```

## Using the Logo Creation Workflow

1. **Click "Logo Creation"** on the dashboard
2. **Review required tools** - Install any missing tools using the provided commands
3. **Fill out the questionnaire** - Provide details about your brand
4. **Generate your plan** - The AI will create a step-by-step plan with:
   - Installation commands
   - Recommended AITMPL agents
   - Ready-to-use image generation prompts
   - Design best practices
5. **Copy prompts** - Use the copy button to grab prompts for Midjourney, DALL·E, etc.

## Troubleshooting

### Backend won't start

**Problem:** `Error: ANTHROPIC_API_KEY not configured`  
**Solution:** Make sure you created the `.env` file and added your API key

**Problem:** Port 3001 already in use  
**Solution:** Change the `PORT` in your `.env` file to another port (e.g., 3002)

### Frontend can't connect to backend

**Problem:** API calls fail with network errors  
**Solution:** 
- Make sure the backend is running on port 3001
- Check that `vite.config.ts` proxy is configured correctly
- Verify CORS is allowing requests from localhost:5174

### Config files not found

**Problem:** "Failed to load tasks" error  
**Solution:** Make sure the config files exist:
- `C:\SnoopLabs\Labs\Mjölnir\frontend\config\projects.json`
- `C:\SnoopLabs\Labs\Mjölnir\frontend\config\tasks\logo.json`

## Adding New Workflows

Want to add more workflows beyond Logo Creation?

1. **Create a new task config** in `config/tasks/your-task.json`
2. **Follow the logo.json structure** with your own:
   - Required tools
   - Questions
   - Recommended agents
   - Prompt templates
3. **Restart the backend** - It will automatically load the new workflow
4. **Access it** - Navigate to `/tasks/your-task-id` in the frontend

## Project Structure

```
Mjölnir/
  frontend/
    config/
      projects.json           # Your SnoopLabs projects catalog
      tasks/
        logo.json            # Logo creation workflow config
    src/
      components/            # Reusable UI components
        ToolChecklist.tsx   # Displays required tools
        TaskForm.tsx        # Dynamic form builder
        PlanDisplay.tsx     # Renders generated plans
      pages/
        Dashboard.tsx       # Main landing page
        LogoTask.tsx        # Logo workflow page
      services/
        api.ts              # Backend API client
      types/
        index.ts            # TypeScript types

  backend/
    src/
      routes/               # API route handlers
        tasks.ts           # Task endpoints
        agents.ts          # Agent recommendations
        tools.ts           # Tool checking
      services/
        configLoader.ts    # Reads config files
        llmService.ts      # Claude API integration
      server.ts            # Main Express app
```

## Next Steps

✨ **Try the Logo Creation workflow** with your own brand  
🎨 **Explore UI component libraries** mentioned in the plan (cult-ui, motion-primitives, etc.)  
📝 **Create new workflows** for other tasks you need help with  
🤖 **Browse AITMPL agents** at https://www.aitmpl.com/agents  

## Support

Having issues? Check:
- Backend logs in the terminal running `npm run dev`
- Browser console for frontend errors (F12 → Console tab)
- This setup guide for common solutions

Enjoy your AI-powered project hub! 🚀

