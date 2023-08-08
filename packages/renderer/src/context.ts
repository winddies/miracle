import type LogicRuntime from '@miracle/logic-runtime';
import { createContext } from 'react';

export const simulatorContext = createContext<{
  designMode: boolean | undefined;
  store: { mountNode: (id: string, dom: HTMLElement | null) => void } | undefined;
  logicRuntime: LogicRuntime;
} | null>(null);
