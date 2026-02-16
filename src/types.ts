import type { ModelContext } from "@adipetcu/webmcp-polyfill";

declare global {
  interface Navigator {
    modelContext?: ModelContext;
  }
}

export function getModelContext(): ModelContext | null {
  if (typeof navigator === "undefined") return null;
  return navigator.modelContext ?? null;
}
