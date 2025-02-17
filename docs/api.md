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
scenario("User can log in with valid credentials", async ({ page }) => {
  // Scenario steps go here
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