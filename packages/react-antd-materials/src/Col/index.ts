// import { IComponentMaterial } from '../../../packages/react-core/interface/material';
// import { IComponentMaterial } from '@/react-core/interface/material';
import { ContainerType } from '@miracle/constants';
import { IComponentMaterial } from '@miracle/react-core';
import Col from 'antd/lib/col';
import { makeComponentDesignClass } from '..//utils';
import Icon from './icon.svg';

export const ColMaterial: IComponentMaterial = {
  name: 'Col',
  group: 'layout',
  component: Col,
  isContainer: true,
  containerType: ContainerType.Layout,
  designProps: {
    className: makeComponentDesignClass('col'),
  },
  schema: {
    componentName: 'Col',
    // type: ComponentType.SingleControl,
    props: {
      style: { height: 40 },
    },
  },
  behaviorRule: {
    droppable: false,
    draggable: true,
    hasPlaceholder: false,
    lockable: false,
    noRef: true,
  },
  resourceConfig: {
    icon: Icon,
  },
};
