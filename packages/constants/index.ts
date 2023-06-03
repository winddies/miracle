export enum EventName {
  IFrameLoaded = 'iframeLoaded',
  Drop = 'drop',
  CreateDropPosition = 'createDropPosition',
  DragEnd = 'dragEnd',
  SelectNode = 'selectNode',
  HoverNode = 'hoverNode',
  NodePropsChange = 'nodePropsChange',
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

export enum DisplayType {
  Inline = 'inline',
}
