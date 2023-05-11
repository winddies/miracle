import Select from 'antd/lib/select';
import { IComponentMaterial } from '../../react-core/interface/material';
import Icon from './icon.svg';

export const SelectMaterial: IComponentMaterial = {
  name: 'Select',
  group: 'input',
  component: Select,
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
