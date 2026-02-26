---
title: Tags and Security
description: Controller and route level tags, plus security scheme definitions.
---

Tags group related endpoints in the generated spec and docs UI. Security schemes declare the authentication methods your API supports. Both can be set at the controller level and refined at the route level.

## Tags

### Controller-level tags

Pass a `tags` array in the `@Controller` options to tag every route in that controller:

```typescript
@Controller('/api/users', { tags: ['Users'] })
export class UsersController implements IController {
  // All routes in this controller are tagged with "Users"
}
```

### Route-level tags

Add tags to individual routes with the `tags` property on `@Route`. Route-level tags are appended to the controller-level tags:

```typescript
@Controller('/api/users', { tags: ['Users'] })
export class UsersController implements IController {
  @Route({
    response: userListSchema,
    tags: ['Admin'],
    summary: 'List all users',
  })
  index(ctx: RouterContext) {
    return ctx.json({ data: [] })
  }
}
```

In this example, the `index` route has both the `Users` and `Admin` tags. Other routes on the controller that do not specify their own tags will only have `Users`.

## Security schemes

Stratal includes three built-in security schemes that are always available in the generated spec:

| Scheme name | OpenAPI type | Location | Details |
| --- | --- | --- | --- |
| `bearerAuth` | HTTP bearer | `Authorization` header | Bearer format: JWT |
| `apiKey` | API key | `X-API-Key` header | Header-based API key |
| `sessionCookie` | API key | `session` cookie | Cookie-based session |

These schemes are defined under `components.securitySchemes` in the generated spec. You reference them by name in your controller and route options.

### Applying security at the controller level

Pass a `security` array in the `@Controller` options. Every route in the controller inherits these schemes:

```typescript
@Controller('/api/users', {
  tags: ['Users'],
  security: ['bearerAuth'],
})
export class UsersController implements IController {
  // All routes require bearerAuth
}
```

### Applying security at the route level

Add a `security` array on `@Route` to extend the controller-level security. Route security is merged with controller security:

```typescript
@Controller('/api/users', {
  tags: ['Users'],
  security: ['bearerAuth'],
})
export class UsersController implements IController {
  @Route({
    response: userListSchema,
    security: ['apiKey'],
    summary: 'List all users',
  })
  index(ctx: RouterContext) {
    // This route requires both bearerAuth and apiKey
    return ctx.json({ data: [] })
  }
}
```

### Making a route public

To mark a route as requiring no authentication, pass an empty `security` array. Since route security is merged with controller security, an empty array on its own does not remove the controller's schemes. To make a truly public route, the controller should not have security set, or the route should be on a controller without security:

```typescript
@Controller('/api/health')
export class HealthController implements IController {
  @Route({
    response: z.object({ status: z.string() }),
    security: [],
    summary: 'Health check',
  })
  index(ctx: RouterContext) {
    return ctx.json({ status: 'ok' })
  }
}
```

### Automatic sessionCookie with guards

When a route or its controller has guards (via `@UseGuards`), Stratal automatically adds `sessionCookie` to the security array if it is not already present. This reflects the fact that guarded routes require authentication:

```typescript
@Controller('/api/admin', {
  tags: ['Admin'],
  security: ['bearerAuth'],
})
@UseGuards(AuthGuard)
export class AdminController implements IController {
  @Route({
    response: adminDashboardSchema,
    summary: 'Admin dashboard',
  })
  index(ctx: RouterContext) {
    // Security in the spec: bearerAuth + sessionCookie (auto-added)
    return ctx.json({ data: {} })
  }
}
```

## Custom security schemes

To define security schemes beyond the three built-in ones, pass a `securitySchemes` object in `OpenAPIModule.forRoot()`:

```typescript
OpenAPIModule.forRoot({
  info: { title: 'My API', version: '1.0.0' },
  securitySchemes: {
    oauth2: {
      type: 'oauth2',
      flows: {
        authorizationCode: {
          authorizationUrl: 'https://auth.example.com/authorize',
          tokenUrl: 'https://auth.example.com/token',
          scopes: {
            'read:users': 'Read user data',
            'write:users': 'Modify user data',
          },
        },
      },
    },
  },
})
```

You can then reference the custom scheme name in your controller and route `security` arrays.

## Next steps

See [Hiding Routes](/openapi/hiding-routes/) to learn how to exclude internal or work-in-progress endpoints from the generated spec.
