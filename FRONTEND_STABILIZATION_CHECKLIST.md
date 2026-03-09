# Frontend Stabilization Checklist

Date: 2026-03-09

## Scope Freeze (Step 1)
- [x] Freeze refactors/moves/renames for frontend.
- [x] Allow fixes only (bugs, regressions, security, runtime errors).
- [x] Keep current UX/flow unchanged unless fixing a defect.
- [x] Baseline verification passed:
  - `npm run lint`
  - `npm run build`

## Rules During Stabilization
- Do not split or restructure files unless required to fix a defect.
- Do not change API contracts unless backend compatibility requires it.
- Prefer minimal, targeted patches.
- Every fix must pass lint + build before moving to the next item.

## Next Step
- Step 2: Full regression pass (auth, chats, messages, realtime, offline, notifications).

## Regression Pass (Step 2)
- [x] Auth flow regression fixed:
  - `AppPage` profile query waits for successful token introspection.
  - `LoginPage` no longer renders a boolean branch.
- [x] Session safety regression fixed:
  - Client state is cleared on logout / logout-all / token-401 / websocket unauthorized.
- [x] Offline queue regression covered:
  - Outbox can be fully cleared on session invalidation.
- [x] Verification passed after fixes:
  - `npm run lint`
  - `npm run build`

## Security / Behavior Sanity (Step 3)
- [x] Dependency sanity:
  - `npm audit --omit=dev` => 0 vulnerabilities.
- [x] Dangerous patterns sanity:
  - No `dangerouslySetInnerHTML`, `eval`, `new Function`, direct `localStorage/sessionStorage` token usage.
- [x] Production logging sanity:
  - Console logging limited to dev-only logger utilities.

## UX / Performance Pass (Step 4)
- [x] UX navigation loops reduced:
  - `MfaPage` redirects with `{ replace: true }`.
  - `VerifyEmailStatus` redirects with `{ replace: true }`.
- [x] Verification passed after UX fixes:
  - `npm run lint`
  - `npm run build`
- [ ] Optional follow-up:
  - App bundle is still large (Vite chunk-size warning); consider route-level lazy loading/manual chunks.
