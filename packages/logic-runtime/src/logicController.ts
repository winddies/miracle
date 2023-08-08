import { IFlowMeta, ILogicFlow } from '@miracle/react-core';
import EventEmitter from 'eventemitter3';
import { keys } from 'lodash';
import { Joiner } from './joiner';
import LogicFlow from './logicFlow';

export type EventFunc = (...args: unknown[]) => void;

export interface EventFuncs {
  [name: string]: EventFunc | undefined;
}

export default class LogicController extends EventEmitter {
  joiners = new Map<string, Joiner>();
  events: EventFuncs = {};

  constructor(private logicData: ILogicFlow) {
    super();
    this.init();
  }

  initEvent: EventFunc = () => null;
  unmountEvent: EventFunc = () => null;

  init() {
    keys(this.logicData.events || {}).forEach((key: string) => {
      const eventMeta = this.logicData.events?.[key];
      const flow = new LogicFlow(eventMeta as IFlowMeta);
      if (key === 'init') {
        this.initEvent = (...args: unknown[]) => flow.start(...args);
        return;
      }

      if (key === 'unmount') {
        this.unmountEvent = (...args: unknown[]) => flow.start(...args);
        return;
      }

      this.events[key] = (...args: unknown[]) => flow.start(...args);
    });
  }

  subscribe() {}
}
