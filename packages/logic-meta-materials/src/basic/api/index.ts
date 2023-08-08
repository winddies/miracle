import { DEFAULT_OUTPUT_NAME, X6NodeType } from '@miracle/constants';
import { uniqueId } from 'lodash';
import Icon from './icon.svg';

export default {
  name: '$api',
  title: '请求',
  type: X6NodeType.Action,
  resourceConfig: {
    icon: Icon,
  },
  action: null,
  propSetFields: {},
  outPorts: [
    {
      id: `${uniqueId()}-out`,
      name: DEFAULT_OUTPUT_NAME,
      label: '',
    },
  ],
  behaviorRule: {
    draggable: true,
  },
};
