---
title: "10 TypeScript Tricks I Wish I Learned Earlier"
date: "2024-12-01"
description: "Advanced TypeScript patterns and techniques that will level up your code quality and developer experience."
tags: ["TypeScript", "JavaScript", "Best Practices"]
---

# 10 TypeScript Tricks I Wish I Learned Earlier

After years of writing TypeScript, these patterns have become second nature. Save yourself time and learn them now.

## 1. Const Assertions for Literal Types

```typescript
// Without as const
const routes = { home: '/', about: '/about' }
// Type: { home: string; about: string }

// With as const
const routes = { home: '/', about: '/about' } as const
// Type: { readonly home: "/"; readonly about: "/about" }
```

## 2. Discriminated Unions for State Management

```typescript
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }

// TypeScript narrows the type based on status
function handle(state: AsyncState<User>) {
  if (state.status === 'success') {
    console.log(state.data) // data is available here
  }
}
```

## 3. Template Literal Types

```typescript
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
type APIRoute = `/api/${string}`
type Endpoint = `${HTTPMethod} ${APIRoute}`

// Valid: 'GET /api/users'
// Invalid: 'PATCH /api/users'
```

## 4. The satisfies Operator

```typescript
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
} satisfies Record<string, string | number>

// config.apiUrl is still string (not string | number)
```

## 5. Mapped Types with Key Remapping

```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
}

type Person = { name: string; age: number }
type PersonGetters = Getters<Person>
// { getName: () => string; getAge: () => number }
```

## 6. Infer in Conditional Types

```typescript
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never

type Result = GetReturnType<() => string> // string
```

## 7. NoInfer Utility (TypeScript 5.4+)

```typescript
function log<T>(value: T, fallback: NoInfer<T>) {
  // fallback type is inferred from value, not the other way
}
```

## 8. Exhaustive Checks with never

```typescript
function assertNever(x: never): never {
  throw new Error(`Unexpected: ${x}`)
}

// TypeScript will error if you miss a case
function handleStatus(status: 'pending' | 'done') {
  switch (status) {
    case 'pending': return 'Waiting...'
    case 'done': return 'Complete!'
    default: return assertNever(status)
  }
}
```

## 9. Type Predicates for Custom Guards

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

const value: unknown = 'hello'
if (isString(value)) {
  console.log(value.toUpperCase()) // TypeScript knows it's a string
}
```

## 10. Branded Types for Safety

```typescript
type UserId = string & { readonly brand: unique symbol }
type OrderId = string & { readonly brand: unique symbol }

function createUserId(id: string): UserId {
  return id as UserId
}

function getUser(id: UserId) { /* ... */ }

// Now TypeScript prevents passing OrderId where UserId is expected
```

## Conclusion

TypeScript's type system is incredibly powerful once you learn to leverage it. These patterns help catch bugs at compile time and make your code self-documenting.

Start incorporating these into your projects, and you'll wonder how you ever coded without them.
