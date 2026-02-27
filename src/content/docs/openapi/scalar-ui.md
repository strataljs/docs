---
title: Scalar UI
description: The interactive docs viewer and how to customize it.
---

Stratal uses [Scalar](https://scalar.com/) to serve an interactive API reference directly from your worker. Scalar reads the generated OpenAPI spec and renders a browsable, searchable interface where consumers can explore endpoints, view schemas, and try out requests.

## Accessing the docs

Once the `OpenAPIModule` is registered, the interactive docs are available at the configured `docsPath`. With default settings, start your dev server and visit:

```
http://localhost:8787/api/docs
```

The JSON spec that powers the UI is available at:

```
http://localhost:8787/api/openapi.json
```

You can import this URL into external tools like Postman, Insomnia, or any OpenAPI-compatible client.

## Built-in theme

Scalar is configured with the `deepSpace` theme by default. Telemetry is disabled. No additional configuration is needed for the UI to work.

## Customizing the docs path

Change where the UI and JSON spec are served by passing `docsPath` and `jsonPath` to `forRoot()`:

```typescript
OpenAPIModule.forRoot({
  info: { title: 'My API', version: '2.0.0' },
  docsPath: '/docs',
  jsonPath: '/openapi.json',
})
```

With this configuration:
- Interactive docs are at `/docs`
- JSON spec is at `/openapi.json`

## Runtime overrides

The `OpenAPIConfigService` is request-scoped, which means you can change the docs title or apply route filters on a per-request basis. This is useful when you want to customize the documentation per environment or API version.

Here is a middleware that overrides the spec title based on a request header:

```typescript
import { inject } from 'stratal'
import { Middleware, MiddlewareHandler, RouterContext, OPENAPI_TOKENS } from 'stratal'
import type { IOpenAPIConfigService } from 'stratal'

@Middleware()
export class EnvironmentDocsMiddleware implements MiddlewareHandler {
  constructor(
    @inject(OPENAPI_TOKENS.ConfigService)
    private openApiConfig: IOpenAPIConfigService,
  ) {}

  async handle(ctx: RouterContext, next: () => Promise<void>) {
    const environment = ctx.header('X-Environment') ?? 'production'

    this.openApiConfig.override({
      info: {
        title: `My API (${environment})`,
        description: `API documentation for the ${environment} environment`,
      },
    })

    await next()
  }
}
```

Each request gets its own instance of `OpenAPIConfigService`, so overrides in one request do not affect others. The override is merged with the base configuration: any fields you set replace the base values, and any fields you omit keep their defaults.

## Next steps

You now have a complete picture of Stratal's OpenAPI system. From here you can explore:

- [Controllers and Routing](/core-concepts/controllers-and-routing/) for more on how controllers work beyond the OpenAPI conventions.
- [Guards](/guides/guards/) for protecting routes with authentication and authorization.
- [Middleware](/guides/middleware/) for request processing pipelines.
