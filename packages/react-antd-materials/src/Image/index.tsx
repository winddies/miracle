import { IComponentMaterial } from '@miracle/react-core';
import { Image } from 'antd/lib';
import Icon from './icon.svg';
import { propSetFields } from './propSetFields';
import { schema } from './schema';

export const ImageMaterial: IComponentMaterial = {
  name: 'Image',
  group: 'display',
  component: Image,
  propSetFields,
  schema,
  behaviorRule: {
    droppable: false,
    draggable: true,
    hasPlaceholder: true,
    lockable: false,
    noRef: true,
  },
  resourceConfig: {
    icon: Icon,
  },
};
