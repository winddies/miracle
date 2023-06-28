import { EventName } from '@miracle/constants';
import { ISchema } from '@miracle/react-core';
import EventEmitter from 'eventemitter3';

export default class SchemaHistories extends EventEmitter {
  static MAX_LEN = 10;
  schemaSnap: ISchema[] = [];
  snapPointer = -1;

  getCurPointer() {
    return this.snapPointer;
  }

  getCurSchema() {
    return this.schemaSnap[this.snapPointer];
  }

  record(schema: ISchema | null) {
    while (this.snapPointer !== -1 && this.snapPointer < this.schemaSnap.length - 1) {
      this.schemaSnap.pop();
    }
    if (this.schemaSnap.length >= SchemaHistories.MAX_LEN) {
      this.schemaSnap.shift();
    }
    schema && this.schemaSnap.push(schema);
    this.snapPointer = this.schemaSnap.length - 1;
    this.emit(EventName.SnapPointerChange);
  }

  canUndo() {
    return this.snapPointer > 0;
  }

  canRedo() {
    return this.snapPointer < this.schemaSnap.length - 1;
  }

  undo(step = 1) {
    if (this.canUndo()) {
      this.snapPointer -= step;
      this.emit(EventName.SnapPointerChange);
    }
  }

  redo(step = 1) {
    if (this.canRedo()) {
      this.snapPointer += step;
      this.emit(EventName.SnapPointerChange);
    }
  }
}
