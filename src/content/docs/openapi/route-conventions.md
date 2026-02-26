---
title: Route Conventions
description: Method name to HTTP verb mapping and auto-derived status codes.
---

Stratal uses convention-based routing. The name of a controller method determines the HTTP verb, URL path, and success status code for that route. This keeps your controllers declarative and removes the need for manual route registration.

## Method-to-route mapping

When you implement a method on a controller, Stratal derives the HTTP method and path suffix automatically:

| Method name | HTTP verb | Path suffix | Success status |
| --- | --- | --- | --- |
| `index()` | GET | _(none)_ | 200 |
| `show()` | GET | `/:id` | 200 |
| `create()` | POST | _(none)_ | 201 |
| `update()` | PUT | `/:id` | 200 |
| `patch()` | PATCH | `/:id` | 200 |
| `destroy()` | DELETE | `/:id` | 200 |

The final URL is the controller's base path plus the path suffix. For a controller registered at `/api/users`:

| Method | Full path |
| --- | --- |
| `index()` | `GET /api/users` |
| `show()` | `GET /api/users/:id` |
| `create()` | `POST /api/users` |
| `update()` | `PUT /api/users/:id` |
| `patch()` | `PATCH /api/users/:id` |
| `destroy()` | `DELETE /api/users/:id` |

You only implement the methods your resource needs. If you only need listing and creation, define `index()` and `create()` and leave the rest out.

## Full CRUD example

Here is a controller that implements all six conventional methods:

```typescript
import { Controller, IController, Route, RouterContext } from 'stratal'
import { z } from 'stratal/validation'
import {
  createUserSchema,
  updateUserSchema,
  userListSchema,
  userResponseSchema,
} from './users.schemas'

@Controller('/api/users', { tags: ['Users'] })
export class UsersController implements IController {
  @Route({
    response: userListSchema,
    summary: 'List all users',
    description: 'Returns a list of all registered users.',
  })
  index(ctx: RouterContext) {
    return ctx.json({ data: [] })
  }

  @Route({
    params: z.object({ id: z.string() }),
    response: userResponseSchema,
    summary: 'Get user by ID',
  })
  show(ctx: RouterContext) {
    const id = ctx.param('id')
    return ctx.json({ data: { id, name: 'Alice' } })
  }

  @Route({
    body: createUserSchema,
    response: userResponseSchema,
    summary: 'Create a user',
  })
  async create(ctx: RouterContext) {
    const body = await ctx.body<{ name: string; email: string }>()
    return ctx.json({ data: { id: '1', ...body } }, 201)
  }

  @Route({
    params: z.object({ id: z.string() }),
    body: updateUserSchema,
    response: userResponseSchema,
    summary: 'Replace a user',
  })
  async update(ctx: RouterContext) {
    const body = await ctx.body<{ name: string; email: string }>()
    return ctx.json({ data: { id: ctx.param('id'), ...body } })
  }

  @Route({
    params: z.object({ id: z.string() }),
    body: updateUserSchema,
    response: userResponseSchema,
    summary: 'Partially update a user',
  })
  async patch(ctx: RouterContext) {
    const body = await ctx.body<Partial<{ name: string; email: string }>>()
    return ctx.json({ data: { id: ctx.param('id'), ...body } })
  }

  @Route({
    params: z.object({ id: z.string() }),
    response: z.object({ success: z.boolean() }),
    summary: 'Delete a user',
  })
  destroy(ctx: RouterContext) {
    return ctx.json({ success: true })
  }
}
```

## The `@Route` decorator

Every conventional method needs a `@Route` decorator to be included in the OpenAPI spec. The decorator accepts a `RouteConfig` object with these properties:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `response` | `ZodType` or `{ schema, description }` | Yes | The success response schema. |
| `body` | `ZodType` | No | Request body schema (for `create`, `update`, `patch`). |
| `params` | `ZodObject` | No | URL parameter schema (for `show`, `update`, `patch`, `destroy`). |
| `query` | `ZodObject` | No | Query parameter schema. |
| `summary` | `string` | No | Short summary for the endpoint. |
| `description` | `string` | No | Longer description for the endpoint. |
| `tags` | `string[]` | No | Additional tags for this route. |
| `security` | `SecurityScheme[]` | No | Security schemes for this route. |
| `hideFromDocs` | `boolean` | No | Exclude this route from the spec. |

## Response shorthand

The `response` property supports two forms. The shorthand passes a Zod schema directly:

```typescript
@Route({
  response: userSchema,
})
```

This generates a response with the description `"Response 200"` (or `"Response 201"` for `create`).

The object form lets you provide a custom description:

```typescript
@Route({
  response: {
    schema: userSchema,
    description: 'The created user',
  },
})
```

## Next steps

Now that you understand how routes are derived, see [Schemas and Validation](/openapi/schemas-and-validation/) to learn how Zod schemas work for both request validation and OpenAPI documentation.
