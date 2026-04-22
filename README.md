# Realtime Chat Frontend

React SPA for a chat and social experience with auth, chats, messages, contacts, blocks, profile/settings, and realtime presence.

## Stack
- React 19 + TypeScript (strict) + Vite
- Routing: react-router-dom
- Server state: @tanstack/react-query
- Client state: zustand (chat/presence)
- Forms: react-hook-form + zod
- HTTP: axios via shared wrappers
- UI: Tailwind CSS v4, Radix primitives, shadcn-style components
- Realtime: socket.io-client
- Notifications: react-hot-toast
- Offline outbox: Dexie

## Architecture Rules
- `shared/*` is the base layer for generic utilities, UI primitives, and HTTP wrappers.
- `features/*` contains business/domain modules.
- Do not call raw axios inside features. Use `src/shared/lib/axios.ts` and `src/shared/lib/api.ts`.
- Success response contract: `{ status: "success", data, message? }`
- Error response contract: `{ status: "error", statusCode, message }`
- Socket lifecycle initialized once via `useWebSocket({ enabled })`.
- Events centralized in `features/websocket/events.ts`.
- Listeners and emitters grouped by concern.

## Entry Points
- `src/main.tsx`: global providers (router, React Query, Toaster).
- `src/App.tsx`: route rendering.
- `src/routes.ts`: route table and route typing.

## Feature Layout (Preferred)
- `components/`, `hooks/`, `hooks/ui/`, `services/`, `schemas/`, `types/`, `messages/`, `constants/`, `index.ts`.

## Project Structure
- `src/` application code
- `src/shared/` generic UI and utilities
- `src/features/` domain modules
- `src/routes.ts` route table
- `src/index.css` design tokens and Tailwind theme
- `public/` static assets

## `src/` Architecture
- `shared/` design system, utilities, API wrappers
- `features/auth/` login, signup, MFA, reset, verify, Google OAuth
- `features/app/` app shell, tabs, settings navigation
- `features/chats/` chat list and conversation views
- `features/messages/` message timeline, composer, offline outbox
- `features/notifications/` unread count and state sync
- `features/contacts/` contacts management
- `features/blocks/` block/unblock flows
- `features/profile/` profile data and updates
- `features/search/` user search
- `features/media/` media upload and previews
- `features/websocket/` socket lifecycle, events, listeners, emitters
- `routes.ts` route table and typing

## Realtime Flow
- Socket is initialized once via `useWebSocket({ enabled })` inside the app shell.
- Events are centralized in `features/websocket/events.ts`.
- Listeners are grouped by concern in `features/websocket/listeners/*`.
- Emitters live in `features/websocket/emitters/*`.
- Realtime updates feed zustand stores and React Query cache where needed.

## Environment Variables
- `VITE_BACKEND_URL` (default: http://localhost:4000)
- `VITE_REFRESH_ENDPOINT` (default: /auth/refresh)

## Local Setup
```bash
npm install
npm run dev
```

## Scripts
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run preview`

## Stabilization Status
Frontend hardening and regression status are tracked in `FRONTEND_STABILIZATION_CHECKLIST.md`.
Architecture rules and conventions live in `AI_PROJECT_CONTEXT.md`.

## Notes
- There is no automated test suite yet; lint and build are the current gate.
