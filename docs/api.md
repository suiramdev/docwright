# API

## describe

Creates a scenario suite that groups related scenarios together.

```typescript
describe(name: string, fn: TaskSuiteFn)
```

Parameters:
- `name`: The name of the scenario suite
- `fn`: A function containing one or more scenarios

Example:
```typescript
describe("Login Flow", () => {
  // Test scenarios go here
});
```

## scenario

Defines an individual scenario within a scenario suite.

```typescript
scenario(name: string, fn: TaskCaseFn)
```

Parameters:
- `name`: The name of the scenario
- `fn`: An async function containing the scenario steps

Example:
```typescript
scenario("How to sign up", async ({ page }) => {
  // Scenario steps go here
});
```


## beforeAll

Defines a hook that runs before all scenarios in a scenario suite.

```typescript
beforeAll(fn: HookFn)
```

Parameters:
- `fn`: An async function containing the hook steps

Example:
```typescript
beforeAll(async () => {
  console.log("before all");
});
```

## afterAll

Defines a hook that runs after all scenarios in a scenario suite.

```typescript
afterAll(fn: HookFn)
``` 

Parameters:
- `fn`: An async function containing the hook steps

Example:
```typescript 
afterAll(async () => {
  console.log("after all");
});
```

## beforeEach

Defines a hook that runs before each scenario in a scenario suite.

```typescript
beforeEach(fn: HookFn)
``` 

Parameters:
- `fn`: An async function containing the hook steps

Example:
```typescript
beforeEach(async () => {
  console.log("before each");
});
```

## afterEach

Defines a hook that runs after each scenario in a scenario suite.

```typescript
afterEach(fn: HookFn)
```

Parameters:
- `fn`: An async function containing the hook steps

Example:
```typescript
afterEach(async () => {
  console.log("after each");
});
```

## text

Adds text content to the documentation output.

```typescript
text(value: string)
```

Parameters:
- `value`: The text content to add to the documentation

Example:
```typescript
text("This section demonstrates the login functionality");
```

## screenshot

Captures a screenshot of the current page state and adds it to the documentation.

```typescript
screenshot(page: Page)
```

Parameters:
- `page`: The Playwright Page object to capture

Example:
```typescript
await screenshot(page);
```

## highlight

Highlights an element on the page by adding a red border around it. Useful for emphasizing specific elements in documentation screenshots.

```typescript
highlight(locator: Locator)
```

Parameters:
- `locator`: A Playwright Locator object pointing to the element to highlight

Example:
```typescript
await highlight(page.locator('.login-button'));
```