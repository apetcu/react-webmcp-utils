import { useEffect, useRef, useState } from "react";
import { initPolyfill } from "@adipetcu/webmcp-polyfill";
import type { ModelContext, ModelContextOptions } from "@adipetcu/webmcp-polyfill";
import { getModelContext } from "./types";

export interface UseWebMCPOptions extends ModelContextOptions {}

export interface UseWebMCPResult {
  modelContext: ModelContext | null;
  isReady: boolean;
}

export function useWebMCP(options?: UseWebMCPOptions): UseWebMCPResult {
  const [isReady, setIsReady] = useState(false);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    initPolyfill();

    const ctx = getModelContext();
    if (ctx && optionsRef.current) {
      ctx.provideContext(optionsRef.current);
    }

    setIsReady(true);

    return () => {
      if (ctx && optionsRef.current) {
        ctx.clearContext();
      }
    };
  }, []);

  return {
    modelContext: isReady ? getModelContext() : null,
    isReady,
  };
}
