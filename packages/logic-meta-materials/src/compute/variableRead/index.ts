import { X6NodeType } from '@miracle/constants';
import { Action, outPorts } from './action';
import Icon from './icon.svg';
import { propSetFields } from './propSetFields';

export default {
  name: '$varRead',
  title: '读取变量',
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
