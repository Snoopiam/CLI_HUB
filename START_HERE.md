# 🚀 Quick Start - Personal AI Project Hub

## What Is This?

A **centralized AI-powered hub** that helps you with creative workflows like **logo creation**. It:
- Shows you what tools you need
- Asks smart questions about your project
- Uses **Claude AI** to generate personalized plans
- Gives you ready-to-use prompts for AI image generators
- Recommends helpful **AITMPL agents**

## 5-Minute Setup

### 1. Get a Claude API Key

Visit **https://anthropic.com** → Sign up → Get API key

### 2. Install Frontend Dependencies

```powershell
cd "C:\SnoopLabs\Labs\PersonalAIHub\frontend"
npm install
```

### 3. Install Backend Dependencies

```powershell
cd "C:\SnoopLabs\Labs\PersonalAIHub\backend"
npm install
```

### 4. Add Your API Key

Create `.env` in the backend folder:

```powershell
cd "C:\SnoopLabs\Labs\PersonalAIHub\backend"
"ANTHROPIC_API_KEY=your-key-here`nPORT=3001`nFRONTEND_URL=http://localhost:5174" | Out-File -FilePath .env -Encoding utf8
```

Replace `your-key-here` with your actual Claude API key.

### 5. Start the Backend (Terminal 1)

```powershell
cd "C:\SnoopLabs\Labs\PersonalAIHub\backend"
npm run dev
```

Wait for: `🚀 Server running on http://localhost:3001`

### 6. Start the Frontend (Terminal 2)

```powershell
cd "C:\SnoopLabs\Labs\PersonalAIHub\frontend"
npm run dev
```

Wait for: `➜  Local:   http://localhost:5174/`

### 7. Open Your Browser

Go to **http://localhost:5174**

## Try It Out!

1. Click **"Logo Creation"** on the dashboard
2. Review the required tools
3. Fill out the questionnaire about your brand
4. Click **"Generate Custom Plan"**
5. Get your personalized logo creation plan with AI prompts!

## What You'll Get

✅ Step-by-step instructions  
✅ Tool installation commands (copy & paste ready)  
✅ Recommended AITMPL agents  
✅ AI-generated image prompts for Midjourney/DALL·E  
✅ Design best practices  

## Optional: Install Claude Code Templates

For enhanced features, install the AITMPL CLI:

```powershell
npm install -g claude-code-templates
```

Or run it once without installing:

```powershell
npx claude-code-templates@latest
```

## Need Help?

📖 **Detailed Setup**: Read `Labs/PersonalAIHub/frontend/SETUP_GUIDE.md`  
📊 **Full Documentation**: Read `Labs/PersonalAIHub/PERSONAL_AI_HUB_COMPLETE.md`  
🐛 **Issues**: Check terminal logs in both windows

## What's Next?

- **Try the logo workflow** with a real project
- **Browse agents** at http://localhost:5174/agents
- **Add new workflows** by creating JSON configs
- **Integrate your UI libraries** (cult-ui, motion-primitives, kokonutui)

---

**Ready? Let's go! 🎨✨**

