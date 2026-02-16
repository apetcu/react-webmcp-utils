import { ModelContextOptions, ModelContext, ToolExecuteCallback, ToolAnnotations } from '@adipetcu/webmcp-polyfill';
export { ModelContext, ModelContextClient, ModelContextOptions, ModelContextTool, ToolAnnotations, ToolExecuteCallback, ToolResponse, ToolResponseContent, UserInteractionCallback, WebMCPDebug } from '@adipetcu/webmcp-polyfill';

interface UseWebMCPOptions extends ModelContextOptions {
}
interface UseWebMCPResult {
    modelContext: ModelContext | null;
    isReady: boolean;
}
declare function useWebMCP(options?: UseWebMCPOptions): UseWebMCPResult;

declare function useModelContext(): ModelContext | null;

interface UseRegisterToolOptions {
    name: string;
    description: string;
    inputSchema?: Record<string, unknown>;
    execute: ToolExecuteCallback;
    annotations?: ToolAnnotations;
    enabled?: boolean;
}
declare function useRegisterTool(options: UseRegisterToolOptions): void;

declare function useToolCallback(callback: ToolExecuteCallback): ToolExecuteCallback;

declare global {
    interface Navigator {
        modelContext?: ModelContext;
    }
}
declare function getModelContext(): ModelContext | null;

export { type UseRegisterToolOptions, type UseWebMCPOptions, type UseWebMCPResult, getModelContext, useModelContext, useRegisterTool, useToolCallback, useWebMCP };
