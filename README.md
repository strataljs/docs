# Stratal Documentation

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)
[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

The official documentation site for [Stratal](https://github.com/strataljs/stratal) — a type-safe, modular framework purpose-built for Cloudflare Workers. Built with [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/).

## Live Site

**[stratal.dev](https://stratal.dev)**

## Overview

This repository contains the source for the Stratal documentation website. [Stratal](https://github.com/strataljs/stratal) is a modular Cloudflare Workers framework featuring dependency injection, automatic OpenAPI documentation, queue consumers, cron jobs, and type-safe configuration.

If you're looking for the framework source code, see the [strataljs/stratal](https://github.com/strataljs/stratal) repository.

## Documentation Sections

- **Introduction** — Why Stratal
- **Getting Started** — Installation, first worker, project structure
- **OpenAPI Documentation** — Setup, route conventions, schemas, Scalar UI
- **Core Concepts** — Modules, controllers, dependency injection, providers, lifecycle hooks, configuration
- **Guides** — Validation, guards, middleware, error handling, environment typing
- **Integrations** — Queues, cron jobs, caching, storage, email, i18n, logging
- **Testing** — Testing module, HTTP testing, mocks and fakes
- **[API Reference](https://api-reference.stratal.dev)** — Auto-generated API docs

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v22 or later)
- [Yarn](https://yarnpkg.com/) (v4 — included via Corepack)

### Setup

```bash
git clone https://github.com/strataljs/docs.git
cd docs
yarn install
yarn dev
```

The dev server starts at `http://localhost:4321`.

### Commands

| Command                  | Action                                              |
| :----------------------- | :-------------------------------------------------- |
| `yarn install`           | Install dependencies                                |
| `yarn dev`               | Start local dev server at `localhost:4321`           |
| `yarn build`             | Build production site to `./dist/`                  |
| `yarn preview`           | Preview production build locally                    |
| `yarn astro ...`         | Run Astro CLI commands (`astro add`, `astro check`) |

## Project Structure

```
├── public/                  # Static assets (favicon, images) served at root
├── src/
│   ├── assets/              # Processed assets (logo, images)
│   ├── content/
│   │   └── docs/            # Documentation pages (MDX/Markdown → URL routes)
│   │       ├── index.mdx    # Homepage (splash template)
│   │       ├── core-concepts/
│   │       ├── getting-started/
│   │       ├── guides/
│   │       ├── integrations/
│   │       ├── openapi/
│   │       └── testing/
│   └── styles/              # Custom CSS overrides
├── astro.config.mjs         # Astro + Starlight config (sidebar, plugins)
├── tsconfig.json            # TypeScript config (extends astro/tsconfigs/strict)
└── package.json
```

Documentation content lives in `src/content/docs/`. File paths map directly to URL routes (e.g., `core-concepts/modules.md` → `/core-concepts/modules/`).

## Contributing

Contributions are welcome! Here's how to help improve the docs:

1. **Edit existing pages** — Find the corresponding `.md` or `.mdx` file in `src/content/docs/` and make your changes.
2. **Add new pages** — Create a new Markdown or MDX file in the appropriate subdirectory. The file path determines the URL route.
3. **Update the sidebar** — New pages need to be added to the `sidebar` array in `astro.config.mjs` to appear in navigation.
4. **File naming** — Use kebab-case for file names (e.g., `error-handling.md`).

You can also edit any page directly on GitHub via the "Edit page" link at the bottom of each documentation page.

## Tech Stack

- [Astro](https://astro.build/) — Static site generator
- [Starlight](https://starlight.astro.build/) — Documentation theme for Astro
- [Cloudflare Workers](https://workers.cloudflare.com/) — Deployment adapter (`@astrojs/cloudflare`)
- [Mermaid](https://mermaid.js.org/) — Diagrams in documentation (`@pasqal-io/starlight-client-mermaid`)

## License

This project is licensed under the [MIT License](LICENSE).
