// import { IComponentMaterial } from '../../../packages/react-core/interface/material';
// import { IComponentMaterial } from '@/react-core/interface/material';
import { DisplayType } from '@miracle/constants';
import { IComponentMaterial } from '@miracle/react-core';
import Button from 'antd/es/button';
import Icon from './icon.svg';
import { propSetFields } from './propSetFields';
import { schema } from './schema';

export const ButtonMaterial: IComponentMaterial = {
  name: 'Button',
  group: 'button',
  component: Button,
  propSetFields,
  display: DisplayType.Inline,
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
