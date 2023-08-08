import { DEFAULT_OUTPUT_NAME, X6NodeType } from '@miracle/constants';
import { uniqueId } from 'lodash';
import Icon from './icon.svg';

export default {
  name: '$routeTo',
  title: '路由跳转',
  type: X6NodeType.Action,
  resourceConfig: {
    icon: Icon,
  },
  action: null,
  outPorts: [
    {
      id: `${uniqueId()}-out`,
      name: DEFAULT_OUTPUT_NAME,
      label: '输出',
    },
  ],
  // propSetFields: {},

  behaviorRule: {
    draggable: true,
  },
};
