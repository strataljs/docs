---
title: Hiding Routes
description: Using hideFromDocs to exclude internal endpoints.
---

Not every endpoint belongs in your public API documentation. Internal tools, debug endpoints, or work-in-progress features can be hidden from the generated spec while still functioning normally.

## Why hide routes

Common reasons to exclude routes from the OpenAPI spec:

- **Internal endpoints** used by your infrastructure (health checks, metrics).
- **Debug or admin tools** that are not part of the public API surface.
- **Work-in-progress features** that are deployed but not ready for consumers.

Hidden routes still handle requests. They just do not appear in the JSON spec or the Scalar UI.

## Controller-level hiding

Set `hideFromDocs: true` in the `@Controller` options to hide every route on that controller:

```typescript
@Controller('/api/internal', { hideFromDocs: true })
export class InternalController implements IController {
  @Route({
    response: z.object({ status: z.string() }),
    summary: 'Health check',
  })
  index(ctx: RouterContext) {
    return ctx.json({ status: 'ok' })
  }

  @Route({
    params: z.object({ id: z.string() }),
    response: z.object({ data: z.unknown() }),
    summary: 'Debug info',
  })
  show(ctx: RouterContext) {
    return ctx.json({ data: {} })
  }
}
```

Both `GET /api/internal` and `GET /api/internal/:id` work at runtime but are excluded from the spec.

## Route-level hiding

Set `hideFromDocs: true` on a specific `@Route` to hide just that endpoint:

```typescript
@Controller('/api/users', { tags: ['Users'] })
export class UsersController implements IController {
  @Route({
    response: userListSchema,
    summary: 'List all users',
  })
  index(ctx: RouterContext) {
    return ctx.json({ data: [] })
  }

  @Route({
    params: z.object({ id: z.string() }),
    response: z.object({ debug: z.unknown() }),
    summary: 'Debug user state',
    hideFromDocs: true,
  })
  show(ctx: RouterContext) {
    // Hidden from docs, but still accessible
    return ctx.json({ debug: {} })
  }
}
```

Here `GET /api/users` appears in the docs, but `GET /api/users/:id` does not.

## Override behavior

Route-level `hideFromDocs` takes precedence over the controller-level setting. If a controller has `hideFromDocs: true` and a route does not explicitly set `hideFromDocs`, the route inherits the controller's value and stays hidden.

## Runtime filtering

For more dynamic control, use the `OpenAPIConfigService` to apply a custom route filter at runtime. This is useful when you want to filter routes based on request context, such as environment or tenant.

Inject the config service in a middleware and call `override()` with a `routeFilter` function:

```typescript
import { inject } from 'stratal'
import { Middleware, MiddlewareHandler, RouterContext, OPENAPI_TOKENS } from 'stratal'
import type { IOpenAPIConfigService } from 'stratal'

@Middleware()
export class DocsFilterMiddleware implements MiddlewareHandler {
  constructor(
    @inject(OPENAPI_TOKENS.ConfigService)
    private openApiConfig: IOpenAPIConfigService,
  ) {}

  async handle(ctx: RouterContext, next: () => Promise<void>) {
    this.openApiConfig.override({
      routeFilter: (path, pathItem) => {
        // Only include /api/v1 routes in the spec
        return path.startsWith('/api/v1')
      },
    })

    await next()
  }
}
```

The `routeFilter` function receives the path string and the OpenAPI path item object. Return `true` to include the route, `false` to exclude it. This filter runs in addition to `hideFromDocs`. Routes hidden by the flag are excluded before the filter runs.

## Next steps

See [Scalar UI](/openapi/scalar-ui/) to learn about the interactive documentation viewer and how to customize it.
