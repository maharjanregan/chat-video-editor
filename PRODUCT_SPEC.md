# chatVideoEditor — Product Spec (v1)

## One-liner
A **chat-first** video editing web app where the user edits by typing natural language and the system responds with a **proposed edit plan** that the user can **Apply**—treating chat as the primary controller of the timeline.

## Target users
- People who want to edit quickly without learning a pro editor.
- Creators who know what they want (“trim intro”, “remove silence”, “add captions”).
- Users who prefer conversation over complex UI.

## Core UX decisions
- **Two-pane layout**:
  - Left: video player + timecode + minimal timeline bar (click to seek).
  - Right: chat with message history.
- Assistant must **always propose** an edit plan (operations list) before applying.
- Each plan has:
  - operations list (typed)
  - an estimated impact summary (diff)
  - buttons: **Apply** / **Revise**
- **Undo/Redo** across applied plans.
- **Non-destructive**: project = original asset + ordered operations.
- Two render modes:
  - **Preview**: fast, lower quality
  - **Final Export**: higher quality, 720p/1080p

## Safety & limits
- Strict file validation: mp4/mov/webm.
- Configurable limits: max size (default 500MB), max duration (default 30m).
- Never accept arbitrary shell strings.
- FFmpeg commands are generated from **safe templates** with controlled args.

## Tech stack (locked)
- Frontend: **Next.js (App Router) + TypeScript + Tailwind**
- Backend: **Next.js route handlers**
- Storage: **SQLite via Prisma**
- Jobs: **in-process job runner** (Redis optional later)
- Rendering: **FFmpeg via child_process spawn** with safe args builder
- Planning: deterministic **MockChatModel** (rule-based) behind an `IChatModel` interface

## Acceptance criteria (v1)
- Upload a video.
- Type: “trim first 3 seconds”.
- See proposed plan + Apply.
- Apply triggers preview render.
- Export 1080p.
- Undo returns to previous version.
- Bad inputs do not crash; errors are human-readable.
