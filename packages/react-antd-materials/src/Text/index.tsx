import { IComponentMaterial } from '@miracle/react-core';
import { Typography } from 'antd';
import Icon from './icon.svg';
import { propSetFields } from './propSetFields';
import { schema } from './schema';

const { Text } = Typography;

export const TextMaterial: IComponentMaterial = {
  title: '文本',
  name: 'Text',
  group: 'display',
  component: Text,
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
