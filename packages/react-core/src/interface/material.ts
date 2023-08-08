import { ContainerType } from '@miracle/constants';
import React from 'react';
import { FormSchema } from './form';
import { ILogicFlow } from './logic';

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
  children?: ISchema[];
  containerType?: ContainerType;
  isContainer?: boolean;
  // type?: ComponentType;
  id?: string;
  props?: Record<string, any>;
  'x-logic'?: ILogicFlow;
}

export interface IComponentMaterial {
  title: string;
  name: string;
  group: string;
  schema: ISchema;
  containerType?: ContainerType;
  isContainer?: boolean;
  component: React.FC<any> | React.ComponentClass<any>;
  resourceConfig: IResourceConfig;
  behaviorRule: IBehaviorRule;
  propSetFields?: FormSchema;
  designProps?: Record<string, any>;
}
