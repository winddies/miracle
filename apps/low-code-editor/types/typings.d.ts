import { IEngine } from '@miracle/engine';

declare global {
  declare module '*.svg';
  declare module '*.png';

  interface Window {
    designerEngine: IEngine;
  }

  declare module '*.module.less';
}
