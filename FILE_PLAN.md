# Folder & File Plan (chatVideoEditor)

## App Router pages
- `src/app/page.tsx` — Main editor shell (two-pane layout)
- `src/app/projects/[id]/page.tsx` — Project-specific editor view

## UI components
- `src/components/EditorShell.tsx` — Layout container
- `src/components/VideoPane.tsx` — Player + timecode + timeline
- `src/components/TimelineBar.tsx` — Minimal timeline representation
- `src/components/ChatPane.tsx` — Chat UI + input
- `src/components/PlanCard.tsx` — Proposed edits + Apply/Revise

## Core modules (backend/shared)
- `src/core/operationSchema.ts` — Zod schema for operations, project state
- `src/core/planner.ts` — Deterministic plan generator (rule-based)
- `src/core/chatModel.ts` — `IChatModel` + `MockChatModel`
- `src/core/renderer.ts` — Operation → FFmpeg args/filter graph (safe templates)
- `src/core/jobQueue.ts` — In-process job queue + progress parsing
- `src/core/projectService.ts` — CRUD and persistence helpers

## Backend routes (later milestones)
- `src/app/api/upload/route.ts` — Upload asset + create project
- `src/app/api/projects/[id]/route.ts` — Get project state
- `src/app/api/chat/route.ts` — Propose plan (MockChatModel)
- `src/app/api/projects/[id]/apply/route.ts` — Apply plan (operations + history)
- `src/app/api/projects/[id]/render/route.ts` — Enqueue preview/final render

## Prisma
- `prisma/schema.prisma` — Project, Asset, Operation, Render, ChatMessage
- `src/lib/db.ts` — Prisma client

## Jobs
- `data/uploads/` — stored raw uploads (gitignored)
- `data/renders/` — outputs (gitignored)

## Tests
- `src/core/__tests__/planner.test.ts` — plan parsing tests
- `src/core/__tests__/schema.test.ts` — schema validation tests

## Config
- `.env` — file limits, paths
