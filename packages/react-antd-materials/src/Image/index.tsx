import { IComponentMaterial } from '@miracle/react-core';
import _Image from './component';
import Icon from './icon.svg';
import { propSetFields } from './propSetFields';
import { schema } from './schema';

export const ImageMaterial: IComponentMaterial = {
  title: '图片',
  name: 'Image',
  group: 'display',
  component: _Image,
  propSetFields,
  schema,
  behaviorRule: {
    droppable: true,
    draggable: true,
    hasPlaceholder: true,
    lockable: false,
  },
  resourceConfig: {
    icon: Icon,
  },
};
