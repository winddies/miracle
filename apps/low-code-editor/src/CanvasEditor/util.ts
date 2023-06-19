import { uniqueId } from 'lodash';
import { createContext } from 'react';

export function getEngine() {
  return window.designerEngine;
}

export function makeMiracleId() {
  return `miracle-${uniqueId()}`;
}

export const isHTMLElement = (obj: any): obj is HTMLElement => {
  return obj?.['nodeName'] || obj?.['tagName'];
};

export const simulatorContext = createContext<any>(null);
