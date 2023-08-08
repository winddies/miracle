import { ILogicFlow } from '@miracle/react-core';
import EventEmitter from 'eventemitter3';
import LogicController from './logicController';

export default class RunTimeEngine extends EventEmitter {
  controllers = new Map<string, LogicController>();

  createController(name: string, logicData: ILogicFlow) {
    const controller = new LogicController(logicData);
    this.controllers.set(name, controller);
    return controller;
  }
}
