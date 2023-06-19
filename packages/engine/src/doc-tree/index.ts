import { EventName } from '@miracle/constants';
import { ISchema } from '@miracle/react-core';
import EventEmitter from 'eventemitter3';
import { singleton } from 'tsyringe';
import type { IPointLocation } from '../dragon';
import ReactDomCollector from './reactInstanceCollector';
// eslint-disable-next-line import/no-cycle
import Node from './node';

@singleton()
export default class DocTreeModel extends EventEmitter {
  rootNode: Node | null = null;
  nodeMap: Map<string, Node> = new Map();
  selectedNode: Node | null = null;

  hoveredNode: Node | null = null;

  resizeObserver: ResizeObserver | null = null;

  constructor(public reactDomCollector: ReactDomCollector) {
    super();
  }

  getSchema(): ISchema | null {
    if (!this.rootNode) return null;

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
    // this.resizeObserver?.disconnect();
    this.selectedNode = node;
    // if (!node) return;
    // this.resizeObserver = new ResizeObserver(() => {
    //   this.emit(EventName.Resize);
    // });

    // const dom = this.reactDomCollector.domNodeMap.get(node.id)?.dom;
    // if (!dom) return;
    // this.resizeObserver.observe(dom);
  }

  setHoverNode(node: Node | null) {
    this.hoveredNode = node;
  }

  removeNode(node: Node) {
    this.nodeMap.delete(node.id);
    node.parent?.removeChild(node);
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

  onNodePropsChange() {
    this.emit(EventName.NodePropsChange);
  }
}
