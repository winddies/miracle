import { DEFAULT_OUTPUT_NAME } from '@miracle/constants';
import { ILogicAction } from '@miracle/react-core';
import { uniqueId } from 'lodash';

// interface IConfig {
//   url: string;
// }
export const outPorts = [
  {
    id: `${uniqueId()}-out`,
    name: DEFAULT_OUTPUT_NAME,
    label: '输出',
  },
];

export class Action implements ILogicAction {
  value: string | null = null;
  targetOutportId = outPorts[0].id;

  config(data: string) {
    this.value = data;
  }

  do() {
    console.log('variable write', this.value);
    return this.value;
  }
}
