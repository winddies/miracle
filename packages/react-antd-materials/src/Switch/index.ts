// import { IComponentMaterial } from '../../../packages/react-core/interface/material';
// import { IComponentMaterial } from '@/react-core/interface/material';
import { IComponentMaterial } from '@miracle/react-core';
import { makeComponentDesignClass } from '../utils';
import _Switch from './component';
import Icon from './icon.svg';

export const SwitchMaterial: IComponentMaterial = {
  title: '开关',
  name: 'Switch',
  group: 'button',
  component: _Switch,
  designProps: {
    className: makeComponentDesignClass('switch'),
  },
  schema: {
    componentName: 'Switch',
    // type: ComponentType.SingleControl,
  },
  behaviorRule: {
    droppable: false,
    draggable: true,
    hasPlaceholder: false,
    lockable: false,
  },
  resourceConfig: {
    icon: Icon,
  },
};
