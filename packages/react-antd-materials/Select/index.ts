import { DisplayType } from '@miracle/constants';
import Select from 'antd/lib/select';
import { IComponentMaterial } from '../../react-core/interface/material';
import { makeComponentDesignClass } from '../utils';
import Icon from './icon.svg';

export const SelectMaterial: IComponentMaterial = {
  name: 'Select',
  group: 'input',
  component: Select,
  schema: {
    componentName: 'Select',
    group: 'input',
    display: DisplayType.Inline,
    designProps: {
      className: makeComponentDesignClass('select'),
      open: false,
    },
    props: {
      placeholder: '请选择数据',
      style: {
        width: 150,
      },
    },
    behaviorRule: {
      droppable: false,
      draggable: true,
      hasPlaceholder: true,
      lockable: true,
      noRef: true,
    },
  },
  resourceConfig: {
    icon: Icon,
  },
};
