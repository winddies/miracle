export enum EventName {
  IFrameLoaded = 'iframeLoaded',
  Drop = 'drop',
  CreateDropPosition = 'createDropPosition',
  DragEnd = 'dragEnd',
  DragLeave = 'dragLeave',
  SelectNode = 'selectNode',
  HoverNode = 'hoverNode',
  NodePropsChange = 'nodePropsChange',
  Resize = 'resize',
  CanvasSizeChange = 'canvasSizeChange',
  Undo = 'undo',
  Redo = 'redo',
  SnapPointerChange = 'snapPointerChange',
}

export const MIRACLE_NODE_ID = 'miracle-node-id';

export enum ContainerType {
  Page = 'page',
  Layout = 'layout',
  // SingleControl = 'SingleControl',
  // MultipleControl = 'MultipleControl',
  // LayoutControl = 'LayoutControl',
}

export enum DragObjectType {
  Resource = 'resource',
  Node = 'node',
}

export enum InsertSide {
  ALL = 'all',
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
}

export enum MobileModel {
  IPhone12_Pro = 'iphone 12 Pro',
  IPhone12_Pro_Max = 'iphone 12 Pro Max',
  IPhone8 = 'iphone8',
  IPhone_SE = 'iphone SE',
  IPhone_XR = 'iphone XR',
  Pixel5 = 'Pixel5',
  SamSung_Galaxy_S8 = 'SamSung Galaxy S8',
  SamSung_Galaxy_S20_ultra = 'Samsung Galaxy S20 ultra',
}

export const mobileModelToSize = {
  [MobileModel.IPhone12_Pro]: {
    width: 390,
    height: 844,
  },
  [MobileModel.IPhone12_Pro_Max]: {
    width: 428,
    height: 926,
  },
  [MobileModel.IPhone8]: {
    width: 375,
    height: 667,
  },
  [MobileModel.IPhone_SE]: {
    width: 320,
    height: 568,
  },
  [MobileModel.IPhone_XR]: {
    width: 414,
    height: 896,
  },
  [MobileModel.Pixel5]: {
    width: 393,
    height: 851,
  },
  [MobileModel.SamSung_Galaxy_S8]: {
    width: 360,
    height: 740,
  },
  [MobileModel.SamSung_Galaxy_S20_ultra]: {
    width: 412,
    height: 869,
  },
};

export enum CanvasDisplayMode {
  PC = 'pc',
  Mobile = 'mobile',
}
