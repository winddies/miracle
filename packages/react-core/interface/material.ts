export interface IBehaviorRule {
  droppable?: boolean; // 是否可当作容器
  draggable?: boolean; // 是否允许拖拽
  lockable?: boolean; // 是否可锁定
  hasPlaceholder?: boolean; // 是否有占位符
}

export interface IResourceConfig {
  icon: string;
}

export interface IComponentMaterial {
  name: string;
  group: string;
  component: React.FC | React.ReactElement;
  behaviorRule: IBehaviorRule;
  resourceConfig: IResourceConfig;
}
