import { X6NodeType } from '@miracle/constants';
import { Action, outPorts } from './action';
import Icon from './icon.svg';

export default {
  name: 'start',
  title: '开始',
  type: X6NodeType.Start,
  resourceConfig: {
    icon: Icon,
  },
  action: Action,
  outPorts,

  // propSetFields: {},
  behaviorRule: {
    draggable: true,
  },
};
