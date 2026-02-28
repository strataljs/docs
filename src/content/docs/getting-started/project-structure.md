---
title: Project Structure
description: Recommended directory layout and file conventions.
---

After completing [Your First Worker](/getting-started/your-first-worker/) you have a small project with a controller, a service, a root module, and an entry point. This page explains how to organise those files — and the ones you will add next — as your application grows.

## Minimal layout

A freshly scaffolded Stratal project looks like this:

```
my-worker/
├── src/
│   ├── app.module.ts          # Root module
│   ├── hello.controller.ts    # Controller
│   ├── hello.service.ts       # Service
│   └── index.ts               # Worker entry point
├── package.json
├── tsconfig.json
└── wrangler.jsonc
```

This flat structure works fine for a handful of files. Once you have more than one domain concept you should move to feature modules.

## File naming conventions

Stratal uses a suffix-based naming convention so you can tell what a file does at a glance:

| Suffix              | Purpose                                          | Example                          |
| ------------------- | ------------------------------------------------ | -------------------------------- |
| `.controller.ts`    | Handles HTTP requests for a set of routes         | `notes.controller.ts`            |
| `.service.ts`       | Contains business logic, injected via DI          | `notes.service.ts`               |
| `.module.ts`        | Declares controllers, providers, and imports       | `notes.module.ts`                |
| `.consumer.ts`      | Processes messages from a Cloudflare Queue         | `email.consumer.ts`              |
| `.job.ts`           | Defines a scheduled cron job                       | `cleanup.job.ts`                 |
| `.guard.ts`         | Implements `CanActivate` to protect routes         | `auth.guard.ts`                  |
| `.middleware.ts`    | Runs before a controller method executes           | `request-logger.middleware.ts`   |
| `.tokens.ts`        | Exports DI tokens (Symbols) for a feature          | `notes.tokens.ts`                |
| `.schemas.ts`       | Zod schemas for request/response validation        | `notes.schemas.ts`               |
| `.error.ts`         | Custom error classes extending `ApplicationError`  | `note-not-found.error.ts`        |

You are not required to use every suffix — only add files your feature actually needs.

## Feature modules

As the project grows, group related files into a directory named after the feature. Here is a `notes` CRUD feature:

```
my-worker/
├── src/
│   ├── notes/
│   │   ├── notes.controller.ts
│   │   ├── notes.service.ts
│   │   ├── notes.schemas.ts
│   │   └── notes.module.ts
│   ├── app.module.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── wrangler.jsonc
```

The feature module registers its own controller and service:

```typescript
import { Module } from 'stratal/module'
import { NotesController } from './notes.controller'
import { NotesService } from './notes.service'

@Module({
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
```

Then the root module imports it:

```typescript
import { Module } from 'stratal/module'
import { NotesModule } from './notes/notes.module'

@Module({
  imports: [NotesModule],
})
export class AppModule {}
```

The root module no longer lists individual controllers or providers — each feature module owns its own.

## Scaling up

A larger project with multiple features, queues, scheduled tasks, and cross-cutting concerns might look like this:

```
my-worker/
├── src/
│   ├── notes/
│   │   ├── notes.controller.ts
│   │   ├── notes.service.ts
│   │   ├── notes.schemas.ts
│   │   ├── notes.tokens.ts
│   │   └── notes.module.ts
│   ├── notifications/
│   │   ├── notifications.controller.ts
│   │   ├── notifications.service.ts
│   │   ├── notifications.consumer.ts
│   │   ├── notifications.schemas.ts
│   │   └── notifications.module.ts
│   ├── jobs/
│   │   ├── cleanup.job.ts
│   │   └── jobs.module.ts
│   ├── guards/
│   │   ├── auth.guard.ts
│   │   └── guards.module.ts
│   ├── middleware/
│   │   ├── request-logger.middleware.ts
│   │   └── middleware.module.ts
│   ├── types/
│   │   └── env.d.ts
│   ├── app.module.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── wrangler.jsonc
```

Each directory is a self-contained module. The root module composes them together:

```typescript
import { Module } from 'stratal/module'
import { GuardsModule } from './guards/guards.module'
import { JobsModule } from './jobs/jobs.module'
import { MiddlewareModule } from './middleware/middleware.module'
import { NotesModule } from './notes/notes.module'
import { NotificationsModule } from './notifications/notifications.module'

@Module({
  imports: [
    GuardsModule,
    MiddlewareModule,
    NotesModule,
    NotificationsModule,
    JobsModule,
  ],
})
export class AppModule {}
```

## Key files explained

| File               | Role                                                                                           |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| `src/index.ts`     | Worker entry point. Extends `StratalWorker`, imports `reflect-metadata`, and returns the root module from `configure()`. |
| `src/app.module.ts`| Root module. Imports every feature module so the DI container knows about all controllers, providers, consumers, and jobs. |
| `package.json`     | Lists `stratal` and `reflect-metadata` as dependencies, plus `typescript`, `wrangler`, and `@cloudflare/workers-types` as dev dependencies. |
| `tsconfig.json`    | Enables `experimentalDecorators` and `emitDecoratorMetadata` — both required for Stratal's DI system. |
| `wrangler.jsonc`   | Cloudflare Worker config. Sets the entry point (`main`), compatibility flags (`nodejs_compat`), environment variables, and bindings (KV, Queues, etc.). |

## Recommendations

- **Keep features self-contained.** A feature directory should hold everything it needs — controller, service, schemas, tokens, and module. Other features interact through imports and DI, not by reaching into sibling directories.
- **Co-locate schemas with their feature.** Putting validation schemas next to the controller that uses them makes them easy to find and update together.
- **Extract shared concerns into their own modules.** If a guard or middleware is used by multiple features, give it its own module (e.g. `guards/`) and import that module where needed.
- **Use a `types/` directory for ambient declarations.** Module augmentation files like `env.d.ts` (for typing `Env` bindings) belong in a top-level `types/` directory inside `src/`.
- **Avoid deeply nested directories.** One level of nesting (`src/notes/notes.controller.ts`) is usually enough. Deeper nesting adds navigation overhead without meaningful benefit.
