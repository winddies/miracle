import { X6NodeType } from '@miracle/constants';
import { Action, outPorts } from './action';
import Icon from './icon.svg';
import { propSetFields } from './propSetFields';

export default {
  name: '$varWrite',
  title: '变量赋值',
  type: X6NodeType.Action,
  action: Action,
  resourceConfig: {
    icon: Icon,
  },
  outPorts,
  propSetFields,
  behaviorRule: {
    draggable: true,
  },
};
