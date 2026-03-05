# AI Project Context

## 1) Project Snapshot
- Project type: Frontend SPA built with React + TypeScript + Vite.
- Domain: Chat/social-style app (auth, chats, contacts, blocks, profile, settings, realtime presence).
- Entry points:
  - `src/main.tsx`: global providers (`BrowserRouter`, `QueryClientProvider`, `Toaster`).
  - `src/App.tsx`: route rendering from `src/routes.ts`.
- Path alias is enabled: `@/* -> src/*`.

## 2) Core Stack (Actual)
- React 19 + TypeScript (strict mode).
- Routing: `react-router-dom`.
- Server state: `@tanstack/react-query`.
- Local state: `zustand` (chat/presence stores).
- Forms: `react-hook-form` + `zod` + `@hookform/resolvers/zod`.
- HTTP: `axios` through shared wrappers.
- UI: Tailwind CSS v4 + shadcn-style component patterns + Radix primitives.
- Realtime: `socket.io-client`.
- Notifications: `react-hot-toast`.

## 3) Architecture Rules (Current + Required)

### 3.1 Layering
- `shared/*` is the base layer (UI primitives, generic hooks, helpers, schemas, HTTP wrappers).
- `features/*` holds business/domain modules.
- App composition happens in `features/app/*` and top-level routing (`routes.ts`).

### 3.2 Data Access Rule
- Do not call raw `axios` inside features.
- Use shared API wrappers from:
  - `src/shared/lib/axios.ts`
  - `src/shared/lib/api.ts`
- Standard response contract expected by code:
  - Success: `{ status: "success", data, message? }`
  - Error: `{ status: "error", statusCode, message }`

### 3.3 Feature Internal Structure Rule
Most mature feature modules follow this shape:
- `components/`
- `hooks/`
- `hooks/ui/` for view/controller logic
- `services/` for API calls
- `schemas/` for zod contracts
- `types/`
- `messages/` for user-facing/API-mapped text
- `constants/`
- `index.ts` as public API (barrel)

### 3.4 State Management Rule
- Server state and caching: React Query hooks per feature.
- UI/global interaction state: Zustand stores (`chat.store`, `presence.store`).
- Realtime events update stores and query cache where needed.

### 3.5 Realtime Rule
- Socket lifecycle initialized once via `useWebSocket({ enabled })` (inside app page).
- Event names centralized in `features/websocket/events.ts`.
- Listeners grouped by concern (`Listeners/base`, `Listeners/block`, `Listeners/presence`).
- Emitters grouped by concern (`emitters/*`).

## 4) Folder Structure (Mental Model)
- `src/shared`: generic reusable building blocks.
- `src/features/auth`: auth flows (login/signup/mfa/reset/verify/google/token introspection).
- `src/features/app`: app shell, tabs, settings navigation, global stores.
- `src/features/chats|contacts|blocks|profile|search|media|websocket`: domain modules.
- `src/routes.ts`: route table with typed route objects.

## 5) Naming Conventions (Observed Standard)

### 5.1 Files
- Components: `PascalCase.tsx` (example: `LoginFormCard.tsx`).
- Hooks: `useSomething.ts`.
- UI hooks: `hooks/ui/useSomething.ts`.
- Services: `kebab-case.api.ts`.
- Schemas: `kebab-case.schema.ts`.
- Messages: `kebab-case.messages.ts`.
- Types: `*.types.ts`.
- Barrels: `index.ts`.

### 5.2 Symbols
- Components: `PascalCase`.
- Hooks: `useCamelCase`.
- Constants:
  - Query/mutation keys: `UPPER_SNAKE_CASE` (`*_QUERY_KEY`, `*_MUTATION_KEY`).
  - Event maps: `SOCKET_EVENTS` with UPPER_SNAKE keys and string payload names.
- Route-like unions use kebab-case string literals (example settings routes).

### 5.3 Imports
- Alias imports (`@/...`) are widely used and preferred for cross-module clarity.
- Relative imports are heavily used inside the same feature.
- Barrel imports are common; keep public exports in `index.ts` stable.

## 6) Code Style Decisions
- TypeScript strict mode is enabled (`strict`, `noUnusedLocals`, `noUnusedParameters`).
- Semicolons and double quotes are the dominant formatting style.
- Strong typing in hooks (`useQuery<TError, TData>`, `useMutation<...>`).
- Async UX pattern:
  - `onMutate`: `toast.dismiss()` then `toast.loading(...)`
  - `onSuccess`: dismiss + success action/navigation/cache invalidation
  - `onError`: `resolveApiErrorMessage(...)` + `toast.error(...)`
- Form pattern:
  - zod schema + `zodResolver`
  - `mode: "onChange"`
  - errors rendered via `renderFormErrors` helper.
- Styling:
  - Utility-first Tailwind classes in JSX.
  - `cn()` helper for conditional classes.
  - Design tokens set in `src/index.css` via `@theme` custom properties.

## 7) Error Handling Patterns

### 7.1 Central HTTP Error Normalization
- `shared/lib/axios.ts` normalizes backend/network/timeout errors.
- Handles token refresh automatically on `401` once per request (`_retry` guard).

### 7.2 User Message Resolution
- `resolveApiErrorMessage(raw, dictionary?)` maps backend keys/messages to UX strings.
- Feature message dictionaries (e.g. `login.messages.ts`) are the canonical UX text source.

### 7.3 Async State UI
- Shared `LoadingState`, `ErrorState`, `EmptyState` exist and should be reused.
- Keep error display consistent through shared state components where possible.

## 8) Known Inconsistencies / Error Patterns (Tech Debt)
These exist now; do not copy them into new code:
- Typos in naming:
  - `form-fileds.ts` (should be `form-fields.ts`)
  - `change-email.schama.ts`, `change-password.schama.ts` (should be `.schema.ts`)
  - `AccountStauts.tsx` (should be `AccountStatus.tsx`)
  - `INVALID_CREDIENTIALS` key typo
  - `deactive/reactive` wording mixed with `deactivate/reactivate`
  - `SOCKET_EVENTS.FORCED_DISCONNECT = "forced_disconect"` spelling mismatch risk
- Non-standard filename with space:
  - `delete avatar.api.ts`
- Leftover debug logs / noisy console output in production paths (websocket + login form).
- One lint warning currently exists:
  - Unused eslint-disable in `AvatarChangeDialog.tsx`.
- No test suite detected (`*test*` / `*spec*` files absent).

## 9) Rules For Future AI/Developers (Operational)

### 9.1 Do This
- Add new behavior inside the correct feature module, not in `shared` unless truly generic.
- For every API endpoint, create:
  - typed service in `services/*.api.ts`
  - hook in `hooks/`
  - schema in `schemas/` when input is user-supplied.
- Define stable React Query keys (`*_QUERY_KEY`, `*_MUTATION_KEY`) close to the hook.
- Use `resolveApiErrorMessage` + feature `messages` dictionary.
- Export public API through feature `index.ts`.
- Keep route definitions centralized in `src/routes.ts`.

### 9.2 Avoid This
- Direct axios calls from components/hooks outside shared API wrappers.
- Introducing alternative toast/error patterns per feature.
- Deep cross-feature imports when a feature public `index.ts` already exposes what you need.
- Adding more naming typos or inconsistent vocabulary variants.

## 10) Recommended Golden Template For New Feature
1. Create `src/features/<feature-name>/`.
2. Add `types/`, `schemas/`, `services/`, `hooks/`, `components/`, `messages/`, `index.ts`.
3. Service returns typed data via `apiGet/apiPost/...`.
4. Hook wraps service with React Query and standardized toasts/errors.
5. Component consumes hook and shared UI primitives.
6. Export feature public surface in `index.ts`.

## 11) Quick Quality Checklist Before Merge
- Naming matches conventions (`schema`, `fields`, `status`, `deactivate/reactivate`).
- No debug `console.log` left in app paths.
- API errors pass through centralized normalization + message resolver.
- Query keys are stable and invalidations target the right prefixes.
- New module has barrel exports and no unnecessary deep imports.
- `npm run lint` passes with zero warnings preferred.
