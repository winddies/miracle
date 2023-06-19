// import { IComponentMaterial } from '../../../packages/react-core/interface/material';
// import { IComponentMaterial } from '@/react-core/interface/material';
import { DisplayType } from '@miracle/constants';
import { IComponentMaterial } from '@miracle/react-core';
import Radio from 'antd/lib/radio';
import Icon from './icon.svg';

export const RadioMaterial: IComponentMaterial = {
  name: 'Radio',
  group: 'button',
  component: Radio,
  display: DisplayType.Inline,
  schema: {
    componentName: 'Radio',
    // type: ComponentType.SingleControl,

    props: {
      children: 'Radio',
    },
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
