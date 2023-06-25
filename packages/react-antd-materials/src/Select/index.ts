import { IComponentMaterial } from '@miracle/react-core';
import Select from 'antd/lib/select';
import Icon from './icon.svg';
import { schema } from './schema';

export const SelectMaterial: IComponentMaterial = {
  name: 'Select',
  group: 'input',
  component: Select,
  designProps: {
    open: false,
  },
  schema,
  behaviorRule: {
    droppable: false,
    draggable: true,
    hasPlaceholder: true,
    lockable: true,
    noRef: true,
  },
  resourceConfig: {
    icon: Icon,
  },
};
