# minidex: agent conventions

Small Pokédex app (Vite + React + TypeScript strict, Tailwind CSS, shadcn/ui, Vitest, MSW). No router, no state library. Keep changes minimal.

## Conventions

- All domain logic lives in `src/lib/` as pure functions. Components only call them.
- Tests live next to the code (`foo.ts` → `foo.test.ts`). Every `src/lib/` function
  needs unit tests, including edge cases.
- Tests must NEVER call the network. MSW runs with `onUnhandledRequest: "error"`.
  Need new data? Add a trimmed JSON fixture in `src/fixtures/` and a handler in
  `src/test/handlers.ts`; never hit the real PokéAPI.
- Domain types are in `src/api/types.ts` and match the fixtures.
- Tools are managed with mise (`mise.toml`); packages with pnpm. UI uses Tailwind classes
  and shadcn/ui components; no plain CSS files.

## Commands

- Single test file: `pnpm vitest run src/lib/units.test.ts`
- By test name: `pnpm vitest run -t "<name>"`
- Full check: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`

## Protected paths: do not change

- `src/auth/`
- `.github/`
- `src/components/ui/`: generated shadcn code. Do not edit it, do not test it.
