---
title: Your First Worker
description: Create a module, controller, entry point, and run it.
---

In this guide you will build a Stratal worker with a single `GET /api/hello` endpoint that returns a JSON greeting. By the end you will have a running worker with a controller, a root module, and an entry point.

## Create a controller

Controllers handle incoming requests. Create `src/hello.controller.ts`:

```typescript
import { Controller, IController, Route, RouterContext } from 'stratal/router'
import { z } from 'stratal/validation'

@Controller('/api/hello')
export class HelloController implements IController {
  @Route({
    response: z.object({ message: z.string() }),
  })
  index(ctx: RouterContext) {
    return ctx.json({ message: 'Hello World' })
  }
}
```

A few things to note:

- **`@Controller('/api/hello')`** registers this class as a controller and sets its base path.
- **`IController`** is the interface every controller implements. It defines convention-based method names that map to HTTP verbs automatically:

  | Method      | HTTP verb | Route            |
  | ----------- | --------- | ---------------- |
  | `index()`   | GET       | `/api/hello`     |
  | `show()`    | GET       | `/api/hello/:id` |
  | `create()`  | POST      | `/api/hello`     |
  | `update()`  | PUT       | `/api/hello/:id` |
  | `patch()`   | PATCH     | `/api/hello/:id` |
  | `destroy()` | DELETE    | `/api/hello/:id` |

  You only implement the methods you need — here we define `index()` to handle `GET /api/hello`.

- **`@Route`** configures the route. The `response` property is a Zod schema that validates the response body and feeds into automatic OpenAPI documentation.
- **`RouterContext`** gives you access to the request, params, and helper methods like `ctx.json()`.

## Create the root module

Every Stratal application has a **root module** that declares which controllers (and later, providers) belong to the app. Create `src/app.module.ts`:

```typescript
import { Module } from 'stratal/module'
import { HelloController } from './hello.controller'

@Module({
  controllers: [HelloController],
})
export class AppModule {}
```

The **`@Module`** decorator accepts an options object with:

- **`controllers`** — an array of controller classes to register.
- **`providers`** — services and other injectable classes (covered in [Dependency Injection](/core-concepts/dependency-injection/)).
- **`imports`** — other modules to compose into this one (covered in [Modules](/core-concepts/modules/)).

For now, a single controller is all you need.

## Create the entry point

The entry point is the file Wrangler invokes when a request arrives. Create `src/index.ts`:

```typescript
import 'reflect-metadata'
import { StratalWorker } from 'stratal/worker'
import { AppModule } from './app.module'

export default class Worker extends StratalWorker {
  protected configure() {
    return { module: AppModule }
  }
}
```

- **`import 'reflect-metadata'`** must be the first import. It enables the TypeScript decorator metadata that Stratal's dependency injection relies on.
- **`StratalWorker`** is the base class your worker extends. It wires up the module system, router, and DI container.
- **`configure()`** returns the application configuration, pointing to your root module.

## Run the dev server

Start the local development server:

```bash
npx wrangler dev
```

Once Wrangler is ready you will see output like:

```
⎔ Starting local server...
Ready on http://localhost:8787
```

Test your endpoint:

```bash
curl http://localhost:8787/api/hello
```

You should receive:

```json
{ "message": "Hello World" }
```

## What just happened

Here is the path a request takes through your worker:

1. **Wrangler** receives the HTTP request and hands it to your exported `Worker` class.
2. **StratalWorker** boots the DI container and passes the request to the router.
3. The **router** matches `GET /api/hello` to `HelloController.index()` using the convention-based mapping.
4. The **controller** method runs and returns a JSON response.
5. The response is sent back to the caller.

## Add a service

Real applications rarely put business logic directly in controllers. Stratal uses **dependency injection** to keep concerns separated. Let's extract the greeting into a service.

Create `src/hello.service.ts`:

```typescript
import { Transient } from 'stratal/di'

@Transient()
export class HelloService {
  greet(name: string): string {
    return `Hello, ${name}!`
  }
}
```

**`@Transient()`** marks the class as injectable. By default it creates a new instance each time it is resolved.

Now update the controller to use the service. Replace the contents of `src/hello.controller.ts`:

```typescript
import { Controller, IController, Route, RouterContext } from 'stratal/router'
import { z } from 'stratal/validation'
import { HelloService } from './hello.service'

@Controller('/api/hello')
export class HelloController implements IController {
  constructor(private readonly helloService: HelloService) {}

  @Route({
    response: z.object({ message: z.string() }),
  })
  index(ctx: RouterContext) {
    const message = this.helloService.greet('World')
    return ctx.json({ message })
  }
}
```

Register the service as a provider in `src/app.module.ts`:

```typescript
import { Module } from 'stratal/module'
import { HelloController } from './hello.controller'
import { HelloService } from './hello.service'

@Module({
  controllers: [HelloController],
  providers: [HelloService],
})
export class AppModule {}
```

Restart the dev server and hit the endpoint again — the response is now `{"message":"Hello, World!"}`, produced by the injected service.

## Next steps

Your project should now look like this:

```
my-worker/
├── src/
│   ├── app.module.ts
│   ├── hello.controller.ts
│   ├── hello.service.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── wrangler.jsonc
```

From here you can explore:

- [Project Structure](/getting-started/project-structure/) — recommended directory layout as your app grows.
- [Controllers and Routing](/core-concepts/controllers-and-routing/) — custom routes, path params, and the `handle()` escape hatch.
- [Dependency Injection](/core-concepts/dependency-injection/) — scopes, tokens, and advanced DI patterns.
- [Modules](/core-concepts/modules/) — composing feature modules and sharing providers.
