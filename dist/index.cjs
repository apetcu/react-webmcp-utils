"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  getModelContext: () => getModelContext,
  useModelContext: () => useModelContext,
  useRegisterTool: () => useRegisterTool,
  useToolCallback: () => useToolCallback,
  useWebMCP: () => useWebMCP
});
module.exports = __toCommonJS(index_exports);

// src/useWebMCP.ts
var import_react = require("react");
var import_webmcp_polyfill = require("@adipetcu/webmcp-polyfill");

// src/types.ts
function getModelContext() {
  if (typeof navigator === "undefined") return null;
  return navigator.modelContext ?? null;
}

// src/useWebMCP.ts
function useWebMCP(options) {
  const [isReady, setIsReady] = (0, import_react.useState)(false);
  const optionsRef = (0, import_react.useRef)(options);
  optionsRef.current = options;
  (0, import_react.useEffect)(() => {
    (0, import_webmcp_polyfill.initPolyfill)();
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
var import_react2 = require("react");
var noop = () => () => {
};
var getServerSnapshot = () => null;
function useModelContext() {
  return (0, import_react2.useSyncExternalStore)(noop, getModelContext, getServerSnapshot);
}

// src/useRegisterTool.ts
var import_react4 = require("react");

// src/useToolCallback.ts
var import_react3 = require("react");
function useToolCallback(callback) {
  const ref = (0, import_react3.useRef)(callback);
  ref.current = callback;
  return (0, import_react3.useCallback)(
    (input, client) => ref.current(input, client),
    []
  );
}

// src/useRegisterTool.ts
function useRegisterTool(options) {
  const { name, description, inputSchema, annotations, enabled = true } = options;
  const stableExecute = useToolCallback(options.execute);
  (0, import_react4.useEffect)(() => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getModelContext,
  useModelContext,
  useRegisterTool,
  useToolCallback,
  useWebMCP
});
//# sourceMappingURL=index.cjs.map