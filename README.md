# minidex

A small Pokédex web app built on the public [PokéAPI](https://pokeapi.co). It is a
deliberately small, deterministic test target for an AI remediation bot.

Features: paginated list (20 per page), name search, type filter (matches any of a
pokémon's types), detail view (id, name, sprite, types, height, weight, base stats and
total) and in-memory favorites.

Search and type filter apply to the currently loaded page. Favorites are not persisted.

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
