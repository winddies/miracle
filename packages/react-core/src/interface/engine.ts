import { CanvasDisplayMode } from '@miracle/constants';

export interface IScreenSize {
  width: number;
  height: number;
}

export interface ICanvasDisplayModel {
  mode: CanvasDisplayMode;
  screenSize: IScreenSize;
}
