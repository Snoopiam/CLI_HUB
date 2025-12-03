# My Project Hub - Backend Server

Express + TypeScript backend that powers the Project Hub frontend.

## Setup

### Install Dependencies

```bash
npm install
```

### Configure Environment

Copy `.env.example` to `.env` and fill in your API keys:

```bash
cp .env.example .env
```

Required environment variables:
- `ANTHROPIC_API_KEY` - Your Claude API key from anthropic.com
- `OPENAI_API_KEY` - (Optional) Your OpenAI API key

### Run Development Server

```bash
npm run dev
```

Server will run on `http://localhost:3001`

### Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Tasks

- `GET /api/tasks` - List all available workflows
- `GET /api/tasks/:id` - Get details for a specific workflow
- `POST /api/tasks/:id/plan` - Generate a personalized plan based on user input

### Agents

- `GET /api/agents?task=logo` - Get recommended AITMPL/Claude agents for a workflow

### Tool Checks

- `GET /api/checks/tools` - Check which required tools are installed

### Health

- `GET /health` - Server health check

## Architecture

- **Express** - Web framework
- **TypeScript** - Type safety
- **Anthropic SDK** - Claude AI integration
- **Config-driven** - Reads workflow configs from frontend `/config` directory

