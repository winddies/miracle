// import { IComponentMaterial } from '../../../packages/react-core/interface/material';
// import { IComponentMaterial } from '@/react-core/interface/material';
import { IComponentMaterial } from '@miracle/react-core';
import Input from 'antd/es/input';
import Icon from './icon.svg';
import { propSetFields } from './propSetFields';
import { schema } from './schema';

export const InputMaterial: IComponentMaterial = {
  name: 'Input',
  group: 'input',
  component: Input,
  propSetFields,
  schema,
  designProps: {
    value: null,
  },
  behaviorRule: {
    droppable: false,
    draggable: true,
    hasPlaceholder: false,
    lockable: false,
    noRef: true,
  },
  resourceConfig: {
    icon: Icon,
  },
};
