import { getMaterialByName } from '@miracle/antd-materials';
import { ISchema } from '@miracle/react-core';
import { uniqueId } from 'lodash';
import type DocTreeModel from './index';
import Props from './props';

export default class Node {
  id: string;
  componentName: string;
  parent: Node | undefined;
  docTreeModel: DocTreeModel;
  children: Node[];
  initialSchema: ISchema;
  props: Props;
  isRootNode = false;

  constructor(initialSchema: any, parent: Node | undefined, docTreeModel: DocTreeModel) {
    this.id = initialSchema.id || uniqueId('miracle');
    this.componentName = initialSchema.componentName;
    this.isRootNode = initialSchema.name === 'Root';
    this.parent = parent;
    this.docTreeModel = docTreeModel;
    this.initialSchema = initialSchema;
    this.props = new Props(this, initialSchema?.props, docTreeModel);
    this.children = initialSchema.children?.map((child: any) => new Node(child, this, docTreeModel)) || [];
  }

  exportSchema(): ISchema {
    return {
      ...this.initialSchema,
      id: this.id,
      props: this.props.export(),
      children: this.children?.map((child) => child.exportSchema()) || [],
    };
  }

  exportNodeMaterial() {
    if (this.isRootNode) return this.initialSchema;
    return getMaterialByName(this.componentName);
  }

  getBoundingClientRect() {
    const domNode = this.docTreeModel.reactDomCollector.domNodeMap.get(this.id);
    if (domNode) {
      return domNode.getBoundingClientRect();
    }
  }

  getOriginDom() {
    return this.docTreeModel.reactDomCollector.domNodeMap.get(this.id);
  }

  removeChild(child: Node) {
    this.children.splice(this.children.indexOf(child), 1);
    child.parent = undefined; // eslint-disable-line
  }

  insertChildAtLast(child: Node) {
    this.children.push(child);
    child.parent = this; // eslint-disable-line
  }

  insertChildAtIndex(child: Node, index: number) {
    this.children.splice(index, 0, child);
    child.parent = this; // eslint-disable-line
  }
}
