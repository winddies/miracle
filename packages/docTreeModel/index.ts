import { ISchema } from '@miracle/react-core/interface';
import ReactDomCollector from '@miracle/simulator/reactInstanceCollector';
import { singleton } from 'tsyringe';
import { IPointLocation } from './../dragon/index';
import Node from './node';

@singleton()
export default class DocTreeModel {
  rootNode: Node;
  nodeMap: Map<string, Node> = new Map();
  selectedNode: Node | null = null;

  hoveredNode: Node | null = null;

  constructor(public reactDomCollector: ReactDomCollector) {}

  getSchema(): ISchema {
    return {
      ...this.rootNode.exportSchema(),
    };
  }

  createNode(schema: any, parent?: Node) {
    const node = new Node(schema, parent, this);
    this.nodeMap.set(node.id, node);
    return node;
  }

  setSelectedNode(node: Node | null) {
    this.selectedNode = node;
  }

  setHoverNode(node: Node | null) {
    this.hoveredNode = node;
  }

  removeNode(node: Node) {
    this.nodeMap.delete(node.id);
    node.parent?.children.splice(node.parent.children.indexOf(node), 1);
  }

  getNodeById(id: string) {
    return this.nodeMap.get(id);
  }

  createFromSchema(schema: any) {
    this.rootNode = this.createNode(schema);
  }

  getClosetWrapperNodeByLocation(pointLocation: IPointLocation) {
    const containerMap = new Map<string, Node>();

    for (const [id, node] of this.nodeMap) {
      const rect = node.getBoundingClientRect();

      if (!node || !rect) continue;

      const { left, top, right, bottom } = rect;

      if (
        pointLocation.clientX > left &&
        pointLocation.clientX < right &&
        pointLocation.clientY > top &&
        pointLocation.clientY < bottom
      ) {
        containerMap.set(id, node);
      }
    }

    let minDistance = Infinity;
    let minDistanceId = '';
    for (const [id, node] of containerMap) {
      const { width, height } = node.getBoundingClientRect() as DOMRect;
      const minArea = width * height;
      if (minArea < minDistance) {
        minDistance = minArea;
        minDistanceId = id;
      }
    }

    return containerMap.get(minDistanceId);
  }
}
