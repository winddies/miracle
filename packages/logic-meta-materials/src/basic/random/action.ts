import { ILogicAction } from '@miracle/react-core';
import { uniqueId } from 'lodash';

export const outPorts = [
  {
    id: `${uniqueId()}-out`,
    name: '1',
    label: 'success',
  },
  {
    id: `${uniqueId()}-out`,
    name: '2',
    label: 'failed',
  },
  {
    id: `${uniqueId()}-out`,
    name: '2',
    label: '输出3',
  },
];

export class Action implements ILogicAction {
  targetOutportId = '';

  value: number | null = null;

  do() {
    const result = Math.random();
    if (result > 0.4) {
      this.targetOutportId = outPorts[1].id;
    } else {
      this.targetOutportId = outPorts[0].id;
    }

    this.value = result;

    console.log(this.value);
  }
}
