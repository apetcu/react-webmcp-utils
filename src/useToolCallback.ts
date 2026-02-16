import { useCallback, useRef } from "react";
import type { ToolExecuteCallback } from "@adipetcu/webmcp-polyfill";

export function useToolCallback(callback: ToolExecuteCallback): ToolExecuteCallback {
  const ref = useRef(callback);
  ref.current = callback;

  return useCallback<ToolExecuteCallback>(
    (input, client) => ref.current(input, client),
    [],
  );
}
