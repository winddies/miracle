import { X6NodeType } from '@miracle/constants';
import { Action, outPorts } from './action';
import Icon from './icon.svg';

export default {
  name: '$random',
  title: '随机数',
  type: X6NodeType.Action,
  action: Action,
  resourceConfig: {
    icon: Icon,
  },
  outPorts,
  // propSetFields: {},

  behaviorRule: {
    draggable: true,
  },
};
