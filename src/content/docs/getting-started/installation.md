---
title: Installation
description: Prerequisites, installing stratal, and TypeScript configuration.
---

## Prerequisites

Before you begin, make sure you have the following:

- **Node.js** v18 or later — [download](https://nodejs.org/)
- **A Cloudflare account** — [sign up for free](https://dash.cloudflare.com/sign-up)
- **Wrangler CLI** — installed as a dev dependency in the steps below

## Create a new project

Create a project directory and initialise it:

```bash
mkdir my-worker && cd my-worker
npm init -y
```

Install Stratal and its required peer dependency:

```bash
npm install stratal reflect-metadata
```

Then install the dev dependencies:

```bash
npm install -D typescript wrangler @cloudflare/workers-types
```

## TypeScript configuration

Create a `tsconfig.json` in the project root. Stratal uses TypeScript decorators, so both `experimentalDecorators` and `emitDecoratorMetadata` must be enabled:

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "types": ["@cloudflare/workers-types/2023-07-01"]
  },
  "include": ["src/**/*"]
}
```

## Wrangler configuration

Create a `wrangler.jsonc` file to configure how Cloudflare deploys your worker:

```jsonc
{
  "name": "my-worker",
  "main": "src/index.ts",
  "compatibility_date": "2026-02-25",
  "compatibility_flags": ["nodejs_compat"],
  "vars": {
    "ENVIRONMENT": "development"
  },
  "kv_namespaces": [
    { "binding": "CACHE", "id": "<your-kv-namespace-id>" }
  ]
}
```

Key settings:

- **`main`** — points to your worker entry file.
- **`nodejs_compat`** — required so Stratal can use Node.js APIs (e.g. `reflect-metadata`).
- **`ENVIRONMENT`** — a variable Stratal reads at runtime.
- **`CACHE`** — a KV namespace binding used by Stratal's built-in caching layer. You can create one with `npx wrangler kv namespace create CACHE` and paste the returned `id` into the config.

## Verify the setup

Add a dev script to your `package.json`:

```json
{
  "scripts": {
    "dev": "wrangler dev"
  }
}
```

Create the source directory:

```bash
mkdir src
```

Your project should now look like this:

```
my-worker/
├── src/
├── package.json
├── tsconfig.json
└── wrangler.jsonc
```

Everything is in place. Head to [Your First Worker](/getting-started/your-first-worker/) to create the entry point and build your first route.
