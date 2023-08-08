// import { IComponentMaterial } from '../../../packages/react-core/interface/material';
// import { IComponentMaterial } from '@/react-core/interface/material';
import { IComponentMaterial } from '@miracle/react-core';
import Button from 'antd/es/button';
import Icon from './icon.svg';
import { propSetFields } from './propSetFields';
import { schema } from './schema';

export const ButtonMaterial: IComponentMaterial = {
  title: '按钮',
  name: 'Button',
  group: 'button',
  component: Button,
  propSetFields,
  schema,
  behaviorRule: {
    droppable: false,
    draggable: true,
    hasPlaceholder: true,
    lockable: true,
  },
  resourceConfig: {
    icon: Icon,
  },
};
