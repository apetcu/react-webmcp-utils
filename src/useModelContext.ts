import { useSyncExternalStore } from "react";
import type { ModelContext } from "@adipetcu/webmcp-polyfill";
import { getModelContext } from "./types";

const noop = () => () => {};
const getServerSnapshot = (): ModelContext | null => null;

export function useModelContext(): ModelContext | null {
  return useSyncExternalStore(noop, getModelContext, getServerSnapshot);
}
