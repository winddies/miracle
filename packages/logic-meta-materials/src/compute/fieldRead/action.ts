import { DEFAULT_OUTPUT_NAME } from '@miracle/constants';
import { ILogicAction } from '@miracle/react-core';
import { uniqueId } from 'lodash';

export const outPorts = [
  {
    id: `${uniqueId()}-out`,
    name: DEFAULT_OUTPUT_NAME,
    label: '输出',
  },
];

export class Action implements ILogicAction {
  fields: string[] = [];
  value: Record<string, any> = {};
  targetOutportId = '';

  config(fields: string[]) {
    this.fields = fields;
  }

  do(data: Record<string, any>) {
    this.fields.forEach((field) => {
      this.value[field] = data[field];
    });

    return this.value;
  }
}
