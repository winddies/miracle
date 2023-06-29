import { EventName } from '@miracle/constants';
import { ISchema } from '@miracle/react-core';
import EventEmitter from 'eventemitter3';

export default class SchemaSnapshots extends EventEmitter {
  static MAX_LEN = 10;
  schemaSnapshots: ISchema[] = [];
  snapshotsPointer = -1;

  getCurPointer() {
    return this.snapshotsPointer;
  }

  getCurSchema() {
    return this.schemaSnapshots[this.snapshotsPointer];
  }

  record(schema: ISchema | null) {
    while (this.snapshotsPointer !== -1 && this.snapshotsPointer < this.schemaSnapshots.length - 1) {
      this.schemaSnapshots.pop();
    }
    if (this.schemaSnapshots.length >= SchemaSnapshots.MAX_LEN) {
      this.schemaSnapshots.shift();
    }
    schema && this.schemaSnapshots.push(schema);
    this.snapshotsPointer = this.schemaSnapshots.length - 1;
    this.emit(EventName.SnapshotsPointerChange);
  }

  canUndo() {
    return this.snapshotsPointer > 0;
  }

  canRedo() {
    return this.snapshotsPointer < this.schemaSnapshots.length - 1;
  }

  undo() {
    if (this.canUndo()) {
      this.snapshotsPointer--;
      this.emit(EventName.SnapshotsPointerChange);
    }
  }

  redo() {
    if (this.canRedo()) {
      this.snapshotsPointer++;
      this.emit(EventName.SnapshotsPointerChange);
    }
  }
}
