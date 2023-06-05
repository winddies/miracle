import getStyleFromCss from 'inline-css-parser';
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

export function transInlineCssToStyleObject(inlineCss: string) {
  if (!inlineCss) return {};
  const css = inlineCss.split('{')[1].split('}')[0];
  if (!css || !css.trim()) return {};
  console.log('css', css);
  const obj = getStyleFromCss(css);
  console.log('obj', obj);
  return obj;
}
