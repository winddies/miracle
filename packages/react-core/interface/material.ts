import { ContainerType, DisplayType } from '@miracle/constants/index';

export interface IBehaviorRule {
  droppable?: boolean; // 是否可当作容器
  draggable?: boolean; // 是否允许拖拽
  lockable?: boolean; // 是否可锁定
  hasPlaceholder?: boolean; // 是否有占位符
  noRef?: boolean; // 是否能够转发 ref
}

export interface IResourceConfig {
  icon: string;
}

export interface ISchema {
  componentName: string;
  group: string;
  children?: ISchema[];
  // type?: ComponentType;
  isContainer?: boolean;
  containerType?: ContainerType;
  id?: string;
  designProps?: Record<string, any>;
  props?: Record<string, any>;
  display?: DisplayType;
  behaviorRule: IBehaviorRule;
}

export interface IComponentMaterial {
  name: string;
  group: string;
  schema: ISchema;
  component: React.FC<any> | React.ComponentClass<any>;
  resourceConfig: IResourceConfig;
}
