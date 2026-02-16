// src/useWebMCP.ts
import { useEffect, useRef, useState } from "react";
import { initPolyfill } from "@adipetcu/webmcp-polyfill";

// src/types.ts
function getModelContext() {
  if (typeof navigator === "undefined") return null;
  return navigator.modelContext ?? null;
}

// src/useWebMCP.ts
function useWebMCP(options) {
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
    isReady
  };
}

// src/useModelContext.ts
import { useSyncExternalStore } from "react";
var noop = () => () => {
};
var getServerSnapshot = () => null;
function useModelContext() {
  return useSyncExternalStore(noop, getModelContext, getServerSnapshot);
}

// src/useRegisterTool.ts
import { useEffect as useEffect2 } from "react";

// src/useToolCallback.ts
import { useCallback, useRef as useRef2 } from "react";
function useToolCallback(callback) {
  const ref = useRef2(callback);
  ref.current = callback;
  return useCallback(
    (input, client) => ref.current(input, client),
    []
  );
}

// src/useRegisterTool.ts
function useRegisterTool(options) {
  const { name, description, inputSchema, annotations, enabled = true } = options;
  const stableExecute = useToolCallback(options.execute);
  useEffect2(() => {
    if (!enabled) return;
    const ctx = getModelContext();
    if (!ctx) return;
    try {
      ctx.registerTool({
        name,
        description,
        inputSchema,
        execute: stableExecute,
        annotations
      });
    } catch {
    }
    return () => {
      try {
        ctx.unregisterTool(name);
      } catch {
      }
    };
  }, [name, description, inputSchema, stableExecute, annotations, enabled]);
}
export {
  getModelContext,
  useModelContext,
  useRegisterTool,
  useToolCallback,
  useWebMCP
};
//# sourceMappingURL=index.js.map