import { useEffect } from "react";
import type { ToolAnnotations, ToolExecuteCallback } from "@adipetcu/webmcp-polyfill";
import { getModelContext } from "./types";
import { useToolCallback } from "./useToolCallback";

export interface UseRegisterToolOptions {
  name: string;
  description: string;
  inputSchema?: Record<string, unknown>;
  execute: ToolExecuteCallback;
  annotations?: ToolAnnotations;
  enabled?: boolean;
}

export function useRegisterTool(options: UseRegisterToolOptions): void {
  const { name, description, inputSchema, annotations, enabled = true } = options;
  const stableExecute = useToolCallback(options.execute);

  useEffect(() => {
    if (!enabled) return;

    const ctx = getModelContext();
    if (!ctx) return;

    try {
      ctx.registerTool({
        name,
        description,
        inputSchema,
        execute: stableExecute,
        annotations,
      });
    } catch {
      // Ignore duplicate registration errors (React Strict Mode)
    }

    return () => {
      try {
        ctx.unregisterTool(name);
      } catch {
        // Ignore if already unregistered (React Strict Mode)
      }
    };
  }, [name, description, inputSchema, stableExecute, annotations, enabled]);
}
