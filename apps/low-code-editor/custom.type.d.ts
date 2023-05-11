import { IEngine } from '@miracle/designer';

declare global {
  declare module '*.svg' {
    const content: string;
    export default content;
  }

  interface Window {
    designerEngine: IEngine;
  }

  declare module '*.module.less';
}
