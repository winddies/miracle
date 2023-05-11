// import { IComponentMaterial } from '@miracle/react-core/interface/material';
// import { IComponentMaterial } from '@/react-core/interface/material';
import Button from 'antd/lib/button';
import { IComponentMaterial } from '../../../packages/react-core/interface/material';
import Icon from './icon.svg';

export const ButtonMaterial: IComponentMaterial = {
  name: 'ANTD_BUTTON',
  group: 'button',
  component: Button,
  resourceConfig: {
    icon: Icon,
  },
  behaviorRule: {
    droppable: false,
    draggable: true,
    hasPlaceholder: true,
    lockable: true,
  },
};
