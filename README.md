# Stratal Documentation

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

The official documentation site for [Stratal](https://github.com/strataljs/stratal) — a type-safe, modular framework purpose-built for Cloudflare Workers. Built with [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/).

**Live site:** [stratal.dev](https://stratal.dev)

Documentation content lives in `src/content/docs/`. File paths map directly to URL routes (e.g., `core-concepts/modules.md` → `/core-concepts/modules/`).

## Commands

All commands are run from the root of the project:

| Command                  | Action                                           |
| :----------------------- | :----------------------------------------------- |
| `yarn install`           | Install dependencies                             |
| `yarn dev`               | Start local dev server at `localhost:4321`        |
| `yarn build`             | Build production site to `./dist/`               |
| `yarn preview`           | Preview production build locally                 |
| `yarn astro ...`         | Run Astro CLI commands (`astro add`, `astro check`) |

## Documentation Sections

- **Introduction** — Why Stratal
- **Getting Started** — Installation, first worker, project structure
- **OpenAPI Documentation** — Setup, route conventions, schemas, Scalar UI
- **Core Concepts** — Modules, controllers, dependency injection, providers, lifecycle hooks, configuration
- **Guides** — Validation, guards, middleware, error handling, environment typing
- **Integrations** — Queues, cron jobs, caching, storage, email, i18n, logging
- **Testing** — Testing module, HTTP testing, mocks and fakes
- **[API Reference](https://api-reference.stratal.dev)** — Auto-generated API docs

## Contributing

Edit or add Markdown/MDX files in `src/content/docs/`. Sidebar navigation is configured in `astro.config.mjs`.
