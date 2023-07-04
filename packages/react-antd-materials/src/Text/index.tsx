import { IComponentMaterial } from '@miracle/react-core';
import _Text from './component';
import Icon from './icon.svg';
import { propSetFields } from './propSetFields';
import { schema } from './schema';

export const TextMaterial: IComponentMaterial = {
  name: 'Text',
  group: 'display',
  component: _Text,
  propSetFields,
  schema,
  behaviorRule: {
    droppable: false,
    draggable: true,
    hasPlaceholder: true,
    lockable: false,
  },
  resourceConfig: {
    icon: Icon,
  },
};
