# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the documentation site for **Stratal** — a modular Cloudflare Workers framework. Built with [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/), it generates a static documentation website from Markdown/MDX content files.

The stratal framework source lives in a sibling directory (`../stratal`). Refer to its CLAUDE.md for framework internals.

## Common Commands

```bash
# Install dependencies
yarn install

# Start dev server (http://localhost:4321)
yarn dev

# Build production site to ./dist/
yarn build

# Preview production build locally
yarn preview

# Run Astro CLI commands (e.g., add integrations)
yarn astro <command>
```

Package manager is **Yarn 4.12.0** with `node-modules` linker (not PnP).

## Content Structure

All documentation lives in `src/content/docs/` as `.md` or `.mdx` files. File paths map directly to URL routes:

- `src/content/docs/index.mdx` → `/` (homepage, uses `splash` template)
- `src/content/docs/guides/example.md` → `/guides/example/`
- `src/content/docs/reference/example.md` → `/reference/example/`

Content collections are defined in `src/content.config.ts` using Starlight's `docsLoader` and `docsSchema`.

## Configuration

- **`astro.config.mjs`** — Main config: site title, social links, sidebar navigation. Sidebar entries can be manual (`items` array with slugs) or auto-generated from a directory (`autogenerate`).
- **`tsconfig.json`** — Extends `astro/tsconfigs/strict`.

## Key Conventions

- Static assets go in `public/` (served at root) or `src/assets/` (processed by Astro)
- Frontmatter in docs files controls title, description, and template (`hero` for splash pages)
- Sidebar structure is defined in `astro.config.mjs`, not inferred from the file system (except for `autogenerate` sections)
