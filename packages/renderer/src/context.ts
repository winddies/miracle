import { createContext } from 'react';

export const simulatorContext = createContext<{
  designMode: boolean | undefined;
  store: { mountNode: (id: string, dom: HTMLElement | null) => void } | undefined;
} | null>(null);
