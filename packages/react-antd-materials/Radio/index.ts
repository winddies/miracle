// import { IComponentMaterial } from '@miracle/react-core/interface/material';
// import { IComponentMaterial } from '@/react-core/interface/material';
import { DisplayType } from '@miracle/constants';
import { IComponentMaterial } from '@miracle/react-core/interface/material';
import Radio from 'antd/lib/radio';
import { makeComponentDesignClass } from '../utils';
import Icon from './icon.svg';

export const RadioMaterial: IComponentMaterial = {
  name: 'Radio',
  group: 'button',
  component: Radio,
  schema: {
    componentName: 'Radio',
    group: 'button',
    display: DisplayType.Inline,
    // type: ComponentType.SingleControl,

    props: {
      children: 'Radio',
      className: makeComponentDesignClass('radio'),
    },
    behaviorRule: {
      droppable: false,
      draggable: true,
      hasPlaceholder: false,
      lockable: false,
      noRef: true,
    },
  },
  resourceConfig: {
    icon: Icon,
  },
};
