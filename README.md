# minidex

A small Pokédex web app built on the public [PokéAPI](https://pokeapi.co). It is a
deliberately small, deterministic test target for an AI remediation bot.

Features: paginated list (20 per page), name search, type filter (matches any of a
pokémon's types), detail view (id, name, sprite, types, height, weight, base stats and
total) and in-memory favorites.

Search and type filter apply to the currently loaded page. Favorites are not persisted.

## Deliberate bugs

Visual bugs are planted on purpose for the remediation bot. The open ones are also listed
in the "Known bugs" card in the app's sidebar.

1. Weight is 10x too small (Pikachu shows 0.6 kg, should be 6 kg).
2. ~~Base-stat bars in the detail view are always full width.~~ Fixed by the bot (PR #7).
3. ~~Ids are padded to two digits (`#01 bulbasaur`, should be `#001`).~~ Fixed by the bot (PR #6).
4. "Next" stays enabled on the last page of the list and opens an empty page.
5. Name search ignores uppercase queries (`PIKA` finds nothing, should find pikachu).
6. The type filter only matches a pokémon's first type (`flying` hides charizard).
7. The type filter dropdown is not sorted alphabetically.

## Run

Tool versions are managed with [mise](https://mise.jdx.dev) (`mise.toml`: Node 24, pnpm).

```sh
mise install
pnpm install
pnpm dev         # http://localhost:5173
pnpm build
pnpm lint && pnpm typecheck && pnpm test
```

## Run one test

```sh
pnpm vitest run src/lib/units.test.ts
pnpm vitest run -t "converts decimeters"   # by test name
```

`pnpm test:ci` writes a JUnit report to `junit.xml`. CI can also be started manually
(`workflow_dispatch`) with an optional `test_filter` (test file path or test name).

Tests never touch the network: MSW serves trimmed fixtures from `src/fixtures/` and
fails on any unhandled request.
