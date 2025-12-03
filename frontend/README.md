# My Project Hub

A central AI-powered workflow assistant that helps you manage and execute various creative and technical tasks.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5174`

### Build for Production

```bash
npm run build
```

## Architecture

- **Frontend**: Vite + React + TypeScript + Tailwind CSS
- **Backend**: Node + Express + TypeScript (separate project in `my-project-hub-server`)
- **UI Components**: Uses custom UI libraries (cult-ui, motion-primitives, kokonutui, ui)

## Features

- Config-driven workflows
- AI-powered task planning
- Tool installation guidance
- Integration with AITMPL/Claude agents
- Logo creation workflow (first implementation)

## Project Structure

```
src/
  pages/          # Route pages
  components/     # Reusable components
  config/         # Workflow and project configs
  types/          # TypeScript types
  utils/          # Helper functions
```

