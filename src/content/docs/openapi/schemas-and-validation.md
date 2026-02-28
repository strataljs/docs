---
title: Schemas and Validation
description: Zod schemas for body, params, query, and response with one schema for docs and validation.
---

Every Zod schema you attach to a `@Route` decorator serves two purposes: it validates incoming requests at runtime and it generates the corresponding section in the OpenAPI spec. You write one schema and get both behaviors for free.

## Defining schemas

Import `z` from `stratal/validation` and define your schemas as regular Zod objects. Call `.openapi('Name')` on a schema to register it as a reusable component in the spec under `#/components/schemas/Name`:

```typescript
import { z } from 'stratal/validation'

export const createUserSchema = z
  .object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    role: z.enum(['admin', 'member', 'viewer']).default('member'),
  })
  .openapi('CreateUser')

export const userSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    role: z.enum(['admin', 'member', 'viewer']),
    createdAt: z.string(),
  })
  .openapi('User')
```

Schemas without `.openapi()` are still used for validation and appear inline in the spec, but they will not show up as named components.

## Request body

Use the `body` property on `@Route` to validate JSON request bodies. This is typically used with `create`, `update`, and `patch` methods:

```typescript
@Route({
  body: createUserSchema,
  response: userResponseSchema,
  summary: 'Create a user',
})
async create(ctx: RouterContext) {
  const body = await ctx.body<z.infer<typeof createUserSchema>>()
  // body is fully validated at this point
  return ctx.json({ data: body }, 201)
}
```

In the generated spec, the body schema appears under `requestBody.content.application/json.schema`.

## URL parameters

Use the `params` property to validate URL path parameters. The schema must be a `z.object()` whose keys match the parameter names in the route path:

```typescript
@Route({
  params: z.object({ id: z.string().uuid() }),
  response: userResponseSchema,
  summary: 'Get user by ID',
})
show(ctx: RouterContext) {
  const id = ctx.param('id')
  // id has been validated as a UUID
  return ctx.json({ data: { id } })
}
```

For the common case of a single UUID `id` parameter, Stratal provides a built-in schema:

```typescript
import { uuidParamSchema } from 'stratal/router/schemas'

@Route({
  params: uuidParamSchema,
  response: userResponseSchema,
})
show(ctx: RouterContext) {
  // ...
}
```

## Query parameters

Use the `query` property to validate query string parameters:

```typescript
import { paginationQuerySchema } from 'stratal/router/schemas'

@Route({
  query: paginationQuerySchema,
  response: userListSchema,
  summary: 'List users with pagination',
})
index(ctx: RouterContext) {
  const { page, limit } = ctx.query<{ page: number; limit: number }>()
  // page and limit are validated and coerced to numbers
  return ctx.json({ data: [], pagination: { page, limit, total: 0, totalPages: 0 } })
}
```

## Response schemas

The `response` property defines what the endpoint returns on success. Every `@Route` must include a response schema:

```typescript
export const userResponseSchema = z
  .object({
    data: userSchema,
  })
  .openapi('UserResponse')

@Route({
  response: userResponseSchema,
})
index(ctx: RouterContext) {
  return ctx.json({ data: { id: '1', name: 'Alice' } })
}
```

## Built-in schemas

Stratal provides several reusable schemas you can import from `stratal/router/schemas`:

| Schema | Description |
| --- | --- |
| `uuidParamSchema` | `{ id: string }` validated as UUID. Registered as `UUIDParam`. |
| `paginationQuerySchema` | `{ page: number, limit: number }` with defaults (page 1, limit 20, max 100). Registered as `PaginationQuery`. |
| `successMessageSchema` | `{ message: string, data?: object }`. Registered as `SuccessMessage`. |
| `errorResponseSchema` | Standard error shape with `code`, `message`, `timestamp`, and optional `metadata`. Registered as `ErrorResponse`. |
| `validationErrorResponseSchema` | Error shape with validation `issues` array. Registered as `ValidationErrorResponse`. |
| `paginatedResponseSchema(itemSchema)` | Factory that wraps an item schema in a `{ data, pagination }` envelope. |

## Auto-included error responses

You do not need to define error responses on your routes. Stratal automatically includes these common error schemas on every OpenAPI route:

| Status | Description | Schema |
| --- | --- | --- |
| 400 | Validation error | `ValidationErrorResponse` |
| 401 | Unauthorized | `ErrorResponse` |
| 403 | Forbidden | `ErrorResponse` |
| 404 | Not found | `ErrorResponse` |
| 409 | Conflict | `ErrorResponse` |
| 500 | Internal server error | `ErrorResponse` |

Your `@Route` only needs to define the success response. The error responses are merged in automatically.

## Inferring TypeScript types

Use `z.infer` to derive TypeScript types from your Zod schemas, keeping your types and validation in sync:

```typescript
import { z } from 'stratal/validation'

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['admin', 'member', 'viewer']),
  createdAt: z.string(),
}).openapi('User')

export type User = z.infer<typeof userSchema>
// { id: string; name: string; email: string; role: 'admin' | 'member' | 'viewer'; createdAt: string }
```

## Full example

Here is a complete schemas file for a users feature:

```typescript
import { z } from 'stratal/validation'

export const createUserSchema = z
  .object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    role: z.enum(['admin', 'member', 'viewer']).default('member'),
  })
  .openapi('CreateUser')

export const updateUserSchema = z
  .object({
    name: z.string().min(1).max(100).optional(),
    email: z.string().email().optional(),
    role: z.enum(['admin', 'member', 'viewer']).optional(),
  })
  .openapi('UpdateUser')

export const userSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    role: z.enum(['admin', 'member', 'viewer']),
    createdAt: z.string(),
  })
  .openapi('User')

export const userListSchema = z
  .object({
    data: z.array(userSchema),
  })
  .openapi('UserList')

export const userResponseSchema = z
  .object({
    data: userSchema,
  })
  .openapi('UserResponse')

export type User = z.infer<typeof userSchema>
```

## Next steps

See [Tags and Security](/openapi/tags-and-security/) to learn how to group endpoints and apply authentication requirements in the spec.
