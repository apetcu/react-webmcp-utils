# react-webmcp-utils

React 18+ hooks for the [W3C WebMCP](https://github.com/nicholasgriffintn/webmcp) (`navigator.modelContext`) polyfill.

## Installation

```bash
npm install react-webmcp-utils
```

**Peer dependency:** `react >=18`

## Quick Start

```tsx
import { useWebMCP, useRegisterTool } from "react-webmcp-utils";

function App() {
  const { isReady } = useWebMCP();

  useRegisterTool({
    name: "get-page-title",
    description: "Returns the current page title",
    execute: async () => ({
      content: [{ type: "text", text: document.title }],
    }),
  });

  return <div>{isReady ? "WebMCP ready" : "Loading..."}</div>;
}
```

## API

### `useWebMCP(options?)`

Initializes the WebMCP polyfill and optionally provides context (tools). Returns `{ modelContext, isReady }`.

```tsx
const { modelContext, isReady } = useWebMCP({
  tools: [
    {
      name: "greet",
      description: "Say hello",
      execute: async (input) => ({
        content: [{ type: "text", text: `Hello, ${input.name}!` }],
      }),
    },
  ],
});
```

Cleans up via `clearContext()` on unmount if context was provided.

### `useModelContext()`

Read-only access to `navigator.modelContext` via `useSyncExternalStore`. SSR-safe (returns `null` on server).

```tsx
const ctx = useModelContext();
```

### `useRegisterTool(options)`

Registers a single tool on mount, unregisters on unmount. Safe with React Strict Mode.

```tsx
useRegisterTool({
  name: "search",
  description: "Search the page",
  inputSchema: {
    type: "object",
    properties: { query: { type: "string" } },
    required: ["query"],
  },
  execute: async (input) => ({
    content: [{ type: "text", text: `Results for: ${input.query}` }],
  }),
  enabled: true, // optional, defaults to true
});
```

Options:
- `name` — Tool name
- `description` — Tool description
- `inputSchema` — Optional JSON Schema for input validation
- `execute` — Callback receiving `(input, client)`, must return `ToolResponse`
- `annotations` — Optional `ToolAnnotations` (e.g. `{ readOnlyHint: true }`)
- `enabled` — Optional boolean, defaults to `true`. Set to `false` to skip registration.

### `useToolCallback(callback)`

Stabilizes a `ToolExecuteCallback` using the "latest ref" pattern. Used internally by `useRegisterTool`, but available for advanced use cases.

```tsx
const stableExecute = useToolCallback(async (input, client) => {
  // always uses latest closure values without re-registering the tool
  return { content: [{ type: "text", text: someState }] };
});
```

### `getModelContext()`

SSR-safe helper that returns `navigator.modelContext` or `null`.

## Re-exported Types

All types from `@adipetcu/webmcp-polyfill` are re-exported for convenience:

`ModelContext`, `ModelContextTool`, `ModelContextOptions`, `ModelContextClient`, `ToolAnnotations`, `ToolExecuteCallback`, `ToolResponse`, `ToolResponseContent`, `UserInteractionCallback`, `WebMCPDebug`

## License

Apache-2.0
