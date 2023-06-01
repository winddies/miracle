import { ContainerType } from '@miracle/constants';
import Row from 'antd/lib/row';
import { IComponentMaterial } from '../../react-core/interface/material';
import { makeComponentDesignClass } from '../utils';
import Icon from './icon.svg';

export const RowMaterial: IComponentMaterial = {
  name: 'Row',
  group: 'layout',
  component: Row,
  schema: {
    componentName: 'Row',
    group: 'layout',
    isContainer: true,
    containerType: ContainerType.Layout,
    designProps: {
      className: makeComponentDesignClass('row'),
      style: { height: 40 },
    },

    behaviorRule: {
      droppable: true,
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
