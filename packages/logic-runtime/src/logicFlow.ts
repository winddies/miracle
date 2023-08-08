import { IFlowEdge, IFlowMeta, IFlowNode } from '@miracle/react-core';
import EventEmitter from 'eventemitter3';
import { Joiner } from './joiner';

export type EventFunc = (...args: unknown[]) => void;

export interface EventFuncs {
  [name: string]: EventFunc | undefined;
}

export default class LogicFlow extends EventEmitter {
  joiners = new Map<string, Joiner>();
  events: EventFuncs = {};

  constructor(private flow: IFlowMeta) {
    super();
    this.constructNodes();
    this.constructEdges();
  }

  start(...args: any) {
    const startNode = this.flow.nodes.find((node) => node.data.name === 'start');
    if (!startNode) throw new Error('start node not found');
    const startJoiner = this.joiners.get(startNode.id);
    startJoiner?.run(args);
  }

  constructNodes() {
    this.flow.nodes.forEach((node: IFlowNode) => {
      const joiner = new Joiner(node);
      this.joiners.set(node.id, joiner);
    });
  }

  constructEdges() {
    this.flow.edges.forEach((edge: IFlowEdge) => {
      const from = this.joiners.get(edge.source.cell);
      const to = this.joiners.get(edge.target.cell);
      if (from && to) {
        from.connect(to, edge.source.port);
      }
    });
  }

  subscribe() {}
}
