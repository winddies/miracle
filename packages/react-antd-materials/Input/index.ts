// import { IComponentMaterial } from '@miracle/react-core/interface/material';
// import { IComponentMaterial } from '@/react-core/interface/material';
import { IComponentMaterial } from '@miracle/react-core/interface/material';
import Input from 'antd/lib/input';
import { makeComponentDesignClass } from '../utils';
import Icon from './icon.svg';

export const InputMaterial: IComponentMaterial = {
  name: 'Input',
  group: 'input',
  component: Input,
  schema: {
    componentName: 'Input',
    group: 'input',
    // type: ComponentType.SingleControl,
    designProps: {
      value: null,
    },
    props: {
      className: makeComponentDesignClass('input'),
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
