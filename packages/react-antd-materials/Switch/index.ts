// import { IComponentMaterial } from '@miracle/react-core/interface/material';
// import { IComponentMaterial } from '@/react-core/interface/material';
import { DisplayType } from '@miracle/constants';
import { IComponentMaterial } from '@miracle/react-core/interface/material';
import Switch from 'antd/lib/switch';
import { makeComponentDesignClass } from '../utils';
import Icon from './icon.svg';

export const SwitchMaterial: IComponentMaterial = {
  name: 'Switch',
  group: 'button',
  component: Switch,
  schema: {
    componentName: 'Switch',
    group: 'button',
    display: DisplayType.Inline,
    // type: ComponentType.SingleControl,

    props: {
      children: 'Switch',
      className: makeComponentDesignClass('switch'),
    },
    behaviorRule: {
      droppable: false,
      draggable: true,
      hasPlaceholder: false,
      lockable: false,
    },
  },
  resourceConfig: {
    icon: Icon,
  },
};
