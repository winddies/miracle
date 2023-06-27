import { ISchema } from '@miracle/react-core';

export default class SchemaHistories {
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
    schema && this.schemaSnap.push(schema);
    this.snapPointer = this.schemaSnap.length - 1;
    console.log('record', this.schemaSnap);
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
    }
  }

  redo(step = 1) {
    if (this.canRedo()) {
      this.snapPointer += step;
    }
  }
}
