# 📖 Personal AI Project Hub - User Manual

Welcome to the Personal AI Project Hub! This manual will guide you through using the application to create logos, discover AI agents, and leverage AI-powered workflows for your creative projects.

---

## Table of Contents

1. [What is the Personal AI Project Hub?](#what-is-the-personal-ai-project-hub)
2. [Getting Started](#getting-started)
3. [The Dashboard](#the-dashboard)
4. [Logo Creation Workflow](#logo-creation-workflow)
5. [The Agents Page](#the-agents-page)
6. [Understanding Your Generated Plan](#understanding-your-generated-plan)
7. [Tips for Best Results](#tips-for-best-results)
8. [Frequently Asked Questions](#frequently-asked-questions)
9. [Troubleshooting](#troubleshooting)

---

## What is the Personal AI Project Hub?

The Personal AI Project Hub is your **AI-powered creative assistant**. It helps you with creative tasks like designing logos by:

- **Guiding you through the process** step-by-step
- **Recommending tools** you might need (with easy install commands)
- **Asking smart questions** about your project
- **Generating personalized plans** using Claude AI
- **Creating ready-to-use prompts** for AI image generators like Midjourney or DALL·E

Think of it as having a creative consultant who knows exactly what questions to ask and what tools to recommend!

---

## Getting Started

### Before You Begin

Make sure the application is running:
- **Frontend**: Should be accessible at `http://localhost:5174`
- **Backend**: Should be running on `http://localhost:3001`

If you see a blank page or errors, ask your developer to check the setup (see `START_HERE.md`).

### Opening the App

1. Open your web browser (Chrome, Edge, or Firefox recommended)
2. Navigate to **http://localhost:5174**
3. You should see the Dashboard with "My Project Hub" at the top

---

## The Dashboard

The Dashboard is your home base. Here's what you'll find:

### Workflow Cards

Each card represents a different creative workflow you can run:

| Card | Description |
|------|-------------|
| **Logo Creation** | Create professional logos with AI guidance |
| **Brand Guidelines** | (Coming Soon) Create brand style guides |
| **Pitch Deck** | (Coming Soon) Generate presentation content |

### Quick Stats Section

At the bottom of the dashboard, you'll see three info cards:
- **Get Started** - Reminds you to pick a workflow
- **AI-Powered** - Explains the Claude AI integration
- **Browse Agents** - Link to discover helpful AI agents

### How to Use the Dashboard

1. **Read the workflow descriptions** to find what you need
2. **Click on a workflow card** (e.g., "Logo Creation") to start
3. **Or click "Browse Agents"** to explore available AI assistants

---

## Logo Creation Workflow

This is the main feature! Here's how to create a logo step-by-step.

### Step 1: Review Required Tools

When you open the Logo Creation page, you'll first see a **Required Tools** section.

**What you'll see:**
- A list of tools needed for logo creation
- Each tool shows:
  - **Name** (e.g., "Claude Code Templates")
  - **Type** badge (CLI, Web, or App)
  - **Description** of what it does
  - **Install command** (if applicable) with a copy button
  - **Documentation link** to learn more

**What to do:**
1. **Review each tool** - You don't need ALL of them, but having them helps
2. **Copy install commands** - Click the 📋 button to copy
3. **Run in PowerShell** - Paste and run the command if you want to install
4. **Click documentation links** - To learn more about each tool

**Do I need to install everything?**
- **Claude Code Templates**: Recommended but optional
- **AI Image Generator**: You need at least ONE (Midjourney, DALL·E, Leonardo, etc.)
- **Design Tool**: Optional, for refining your logo later

### Step 2: Review Recommended Agents

Below the tools, you'll see **Recommended Claude Agents**.

These are AI assistants from the AITMPL ecosystem that can help with design tasks:
- **Design Strategist** - Helps with design decisions
- **Prompt Engineer** - Crafts better AI image prompts
- **Brand Consultant** - Evaluates brand consistency

**What to do:**
- Read about each agent
- Click "Learn more" links if interested
- You can enable these agents later using the Claude Code Templates CLI

### Step 3: Fill Out the Questionnaire

This is the most important part! The questionnaire asks about your brand.

**Questions you'll answer:**

| Question | What to Enter | Example |
|----------|---------------|---------|
| **Brand/Company Name** | Your brand name | "SnoopLabs" |
| **Industry/Category** | What field you're in | "Technology, AI Tools" |
| **Target Audience** | Who your customers are | "Developers and tech enthusiasts aged 25-45" |
| **Brand Values & Personality** | How your brand should feel | "Innovative, trustworthy, modern, approachable" |
| **Preferred Logo Style** | Select from dropdown | "Minimalist/Modern" |
| **Color Preferences** | Colors you like | "Deep purple, electric blue, clean white" |
| **Logo Type** | Select from dropdown | "Combination (icon + text)" |
| **Where will it be used?** | Check all that apply | Website, Social Media, Business Cards |
| **Existing Branding** | Any current brand elements | "We use Inter font and purple accent colors" |
| **Inspiration & References** | Logos you admire | "Love the simplicity of Apple, the playfulness of Slack" |
| **Constraints** | Any special requirements | "Must work at small sizes for app icons" |

**Tips for better results:**
- **Be specific** - "Modern tech startup" is better than "technology"
- **Describe emotions** - "Should feel trustworthy and innovative"
- **Mention what to avoid** - "No clip art, no generic icons"
- **Include context** - Why you need the logo, where it'll appear

### Step 4: Generate Your Plan

Once you've filled out the questionnaire:

1. **Click "Generate Custom Plan"** at the bottom
2. **Wait a few seconds** - The AI is creating your personalized plan
3. **Scroll down** to see your results

**What happens behind the scenes:**
- Your answers are sent to the backend
- Claude AI analyzes your brand requirements
- A custom plan is generated just for you
- The plan is displayed with actionable steps

### Step 5: Use Your Generated Plan

Your plan will include several sections:

#### 📋 Step-by-Step Plan
Numbered steps telling you exactly what to do:
1. Research competitors and inspiration
2. Sketch initial concepts
3. Generate AI images
4. Refine and iterate
5. Finalize and export

#### 🤖 Recommended Agents
Specific AI agents that can help, with:
- What each agent does
- How to enable them

#### ✨ AI Image Generation Prompts
**This is the gold!** Ready-to-use prompts you can paste directly into:
- Midjourney
- DALL·E
- Stable Diffusion
- Leonardo.ai
- Any other AI image generator

**How to use the prompts:**
1. Find a prompt you like
2. Click the **"📋 Copy"** button
3. Open your AI image generator
4. Paste the prompt
5. Generate images!

#### 💡 Pro Tips
Additional advice for better results.

---

## The Agents Page

Access this by clicking "Browse Agents" on the dashboard or navigating to `/agents`.

### What You'll See

**CLI Status Banner:**
- Shows if Claude Code Templates CLI is installed
- If not installed, shows install commands with copy buttons

**Category Filters:**
- Click buttons to filter agents by category:
  - Creative
  - Design
  - Business
  - AI Tools
  - etc.

**Agent Cards:**
Each card shows:
- Agent name
- Category badge
- Description
- Tags for easy identification

### How to Use Agents

1. **Browse by category** - Click filter buttons
2. **Find relevant agents** - Read descriptions
3. **Install the CLI** - If you haven't already
4. **Enable agents** - Using the CLI commands shown

---

## Understanding Your Generated Plan

### Plan Quality Depends on Your Input

The AI generates better plans when you provide:
- ✅ Detailed brand descriptions
- ✅ Specific color preferences
- ✅ Clear target audience info
- ✅ Examples of logos you like/dislike

### Iterating on Your Plan

Not happy with the results? Try:
1. **Go back to the questionnaire**
2. **Add more detail** to your answers
3. **Be more specific** about style preferences
4. **Generate again** - Each generation is unique!

### Using Multiple Prompts

The AI typically generates 2-3 different prompts. Try them all!
- Each prompt has a slightly different angle
- Generate multiple images from each
- Mix and match elements you like

---

## Tips for Best Results

### Before Starting
- ✅ Have a clear idea of your brand identity
- ✅ Gather examples of logos you like
- ✅ Know where the logo will be used
- ✅ Have an AI image generator account ready

### During the Questionnaire
- ✅ Fill out ALL fields, even optional ones
- ✅ Be specific rather than vague
- ✅ Mention both what you want AND what you don't want
- ✅ Include emotional descriptors ("should feel premium")

### After Generating
- ✅ Read the entire plan before starting
- ✅ Try all provided prompts
- ✅ Generate multiple variations
- ✅ Iterate and refine based on results

### Pro Tips
- 💡 **Run the workflow multiple times** with slightly different answers
- 💡 **Combine elements** from different generated images
- 💡 **Use a design tool** (Figma, Canva) to refine AI-generated logos
- 💡 **Test at different sizes** - logos should work big AND small

---

## Frequently Asked Questions

### General Questions

**Q: Do I need to pay for this?**
A: The hub itself is free. You'll need:
- A Claude API key (for plan generation) - has free tier
- An AI image generator account (Midjourney, DALL·E, etc.) - varies by service

**Q: Can I use this offline?**
A: No, the hub requires an internet connection to call the Claude API.

**Q: Is my data saved?**
A: Currently, your questionnaire answers and generated plans are NOT saved. Copy anything you want to keep!

### Logo Creation Questions

**Q: Do I need to install all the recommended tools?**
A: No! The tools are recommendations. At minimum, you need access to an AI image generator.

**Q: The prompts didn't work well in my image generator. What now?**
A: Try:
- Adjusting the prompt slightly
- Using a different image generator
- Re-running the workflow with more specific answers

**Q: Can I edit the generated prompts?**
A: Absolutely! The prompts are starting points. Feel free to modify them.

**Q: How do I make the logo a vector file?**
A: AI generators create raster images. To vectorize:
- Use Adobe Illustrator's Image Trace
- Use Figma's auto-trace plugins
- Use online tools like Vectorizer.ai

### Technical Questions

**Q: The page won't load. What's wrong?**
A: Check that both servers are running:
- Backend on port 3001
- Frontend on port 5174

**Q: The plan generation failed. Why?**
A: Common causes:
- Invalid or missing API key in backend `.env`
- Backend server not running
- Network connectivity issues

**Q: Can I add my own workflows?**
A: Yes! See the Developer section in `ONBOARDING_GUIDE.md`.

---

## Troubleshooting

### "Failed to load tasks"
**Cause:** Backend server isn't running or can't be reached.
**Fix:** 
1. Open PowerShell
2. Navigate to `Labs/PersonalAIHub/backend`
3. Run `npm run dev`
4. Refresh the browser

### "Failed to generate plan"
**Cause:** API key issue or Claude API error.
**Fix:**
1. Check `backend/.env` has a valid `ANTHROPIC_API_KEY`
2. Make sure your API key has credits/quota
3. Check the backend terminal for error messages

### Page is blank or shows errors
**Cause:** Frontend build issue or missing dependencies.
**Fix:**
1. Navigate to `Labs/PersonalAIHub/frontend`
2. Run `npm install`
3. Run `npm run dev`
4. Refresh the browser

### Copy button doesn't work
**Cause:** Browser clipboard permissions.
**Fix:**
1. Allow clipboard access when prompted
2. Or manually select and copy the text

### Slow plan generation
**Cause:** Normal - Claude AI takes a few seconds to respond.
**Note:** Generation typically takes 3-10 seconds depending on:
- Your internet connection
- Claude API load
- Complexity of your answers

---

## Getting Help

If you're stuck:

1. **Check this manual** - Most answers are here
2. **Read the FAQ** - Common questions answered
3. **Check TESTING_CHECKLIST.md** - For technical issues
4. **Ask your developer** - For setup problems

---

## Quick Reference Card

### Keyboard Shortcuts
- None currently - all interactions are click-based

### Key URLs
- **Dashboard:** http://localhost:5174
- **Logo Creation:** http://localhost:5174/tasks/logo
- **Agents:** http://localhost:5174/agents

### Key Actions
| Want to... | Do this... |
|------------|------------|
| Create a logo | Dashboard → Click "Logo Creation" |
| Copy a command | Click the 📋 button |
| Generate a plan | Fill questionnaire → Click "Generate Custom Plan" |
| Browse agents | Dashboard → Click "Browse Agents" |
| Go back | Click "← Back to Dashboard" |

---

**Happy creating!** 🎨

If you create something amazing, we'd love to hear about it!

