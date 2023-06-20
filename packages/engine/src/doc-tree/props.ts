import { isEmpty } from 'lodash';
import type DocTreeModel from './index';
import type Node from './node';

const isValidPropValue = (value: any) => {
  /* eslint-disable-next-line no-self-compare */
  if (value == null || Number.isNaN(value)) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  if (typeof value === 'object' && isEmpty(value)) return false;

  return true;
};

export default class Props {
  owner: Node;
  dataModel = new Map();
  originDataModel = new Map();
  docTreeModel: DocTreeModel;

  constructor(owner: Node, values: Record<string, any>, docTreeModel: DocTreeModel) {
    this.owner = owner;
    this.docTreeModel = docTreeModel;
    if (values && !isEmpty(values)) {
      Object.keys(values).forEach((key) => {
        this.dataModel.set(key, values[key]);
        this.originDataModel.set(key, values[key]);
      });
    }
  }

  export() {
    const value = Object.fromEntries(this.dataModel.entries());
    return value;
  }

  setProp(propName: string, value: Record<string, any> | string | number | boolean) {
    if (!isValidPropValue(value)) {
      // eslint-disable-next-line
      value = this.originDataModel.get(propName);
    }

    if (isValidPropValue(value)) {
      this.dataModel.set(propName, value);

      this.docTreeModel.onNodePropsChange();
    }
  }

  getProp(propName: string) {
    return this.dataModel.get(propName);
  }
}
