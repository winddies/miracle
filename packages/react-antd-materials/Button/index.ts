// import { IComponentMaterial } from '@miracle/react-core/interface/material';
// import { IComponentMaterial } from '@/react-core/interface/material';
import { DisplayType } from '@miracle/constants';
import { IComponentMaterial } from '@miracle/react-core/interface/material';
import Button from 'antd/lib/button';
import { makeComponentDesignClass } from '../utils';
import Icon from './icon.svg';

export const ButtonMaterial: IComponentMaterial = {
  name: 'Button',
  group: 'button',
  component: Button,
  schema: {
    componentName: 'Button',
    group: 'button',
    display: DisplayType.Inline,
    // type: ComponentType.SingleControl,

    designProps: {
      className: makeComponentDesignClass('button'),
    },
    props: {
      children: '按钮',
      style: {
        width: 150,
        marginTop: 10,
      },
    },
    behaviorRule: {
      droppable: false,
      draggable: true,
      hasPlaceholder: true,
      lockable: true,
    },
  },
  resourceConfig: {
    icon: Icon,
  },
};
