import { isEmpty } from 'lodash';
import type DocTreeModel from './index';
import type Node from './node';

export default class Props {
  owner: Node;
  dataModel = new Map();
  docTreeModel: DocTreeModel;

  constructor(owner: Node, values: Record<string, any>, docTreeModel: DocTreeModel) {
    this.owner = owner;
    this.docTreeModel = docTreeModel;
    if (values && !isEmpty(values)) {
      Object.keys(values).forEach((key) => this.dataModel.set(key, values[key]));
    }
  }

  export() {
    const value = Object.fromEntries(this.dataModel.entries());
    return value;
  }

  setProp(propName: string, value: Record<string, any>) {
    this.dataModel.set(propName, value);
    this.docTreeModel.onNodePropsChange();
  }

  getProp(propName: string) {
    return this.dataModel.get(propName);
  }
}
