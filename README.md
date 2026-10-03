# React UI Components

A small React and TypeScript component collection, developed and documented in Storybook.

**Stack:** React 19 · TypeScript · CSS Modules · Storybook · Vite

## Components

| Component | Included behavior |
| --- | --- |
| Input | Controlled or internal state, labels, hints, errors, clear action and password visibility |
| Toast | Success, error, warning and info variants, timed dismissal and a close control |
| SidebarMenu | Nested items, expandable groups, overlay dismissal and item callbacks |

Each component has a colocated stylesheet and Storybook stories.

## Run the component explorer

Use Node.js 22.12 or newer within the Node.js 22 series and npm.

```bash
npm ci
npm run storybook
```

Open [localhost:6006](http://localhost:6006).

## Build the explorer

```bash
npm run build-storybook
```

The static component explorer is generated in `storybook-static/`.

## Available checks

```bash
npm run lint
npx tsc -b
npx playwright install chromium
npx vitest run --project=storybook
```

The configuration includes Storybook documentation, accessibility and Vitest browser addons. Their presence does not certify accessibility compliance or test coverage.

## Structure

- `src/components/` — component code, CSS Modules and stories.
- `src/index.ts` — component exports.
- `.storybook/` — explorer and addon configuration.
- `vite.config.ts` — Vite and Storybook test configuration.

## Scope

Storybook is the demo entry point. The scaffold's `index.html` refers to a missing `src/main.tsx`, so the standalone Vite app commands are not the supported way to preview this collection.

This is an assessment project, not a published component package. Sidebar keyboard/focus behavior and callback-driven navigation can be expanded further.
