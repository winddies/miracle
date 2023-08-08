import { EventName } from '@miracle/constants';
import { isEmpty } from 'lodash';
import type DocTreeModel from './index';
import type Node from './node';

export default class Logic {
  owner: Node;
  dataModel = new Map();
  originDataModel = new Map();
  events = new Map();
  docTreeModel: DocTreeModel;

  constructor(owner: Node, values: Record<string, any>, docTreeModel: DocTreeModel) {
    this.owner = owner;
    this.docTreeModel = docTreeModel;
    this.init(values);
  }

  init(values: Record<string, any>) {
    if (!values || isEmpty(values)) return null;
    const { events } = values;

    if (values && !isEmpty(values)) {
      Object.keys(events).forEach((key) => {
        this.events.set(key, events[key]);
      });
    }
  }

  export() {
    if (this.events.size === 0) return null;

    return {
      events: this.exportEvents(),
    };
  }

  exportEvents() {
    const value = Object.fromEntries(this.events.entries());
    return value;
  }

  setEvent(eventName: string, value: Record<string, any>) {
    this.events.set(eventName, value);
    this.docTreeModel.emit(EventName.BindEvent);
  }

  deleteEvent(eventName: string) {
    this.events.delete(eventName);
  }
}
