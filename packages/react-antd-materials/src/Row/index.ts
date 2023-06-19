import { ContainerType } from '@miracle/constants';
import { IComponentMaterial } from '@miracle/react-core';
import Row from 'antd/lib/row';
import { makeComponentDesignClass } from '../utils';
import Icon from './icon.svg';

export const RowMaterial: IComponentMaterial = {
  name: 'Row',
  group: 'layout',
  component: Row,
  containerType: ContainerType.Layout,
  isContainer: true,
  designProps: {
    className: makeComponentDesignClass('row'),
  },
  schema: {
    componentName: 'Row',
    props: {
      style: { height: 40 },
    },
  },
  behaviorRule: {
    droppable: true,
    draggable: true,
    hasPlaceholder: true,
    lockable: true,
    noRef: true,
  },
  resourceConfig: {
    icon: Icon,
  },
};
