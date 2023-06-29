import { CanvasDisplayMode, EventName, MobileModel, mobileModelToSize } from '@miracle/constants';
import { IEngine } from '@miracle/engine';
import { makeAutoObservable, reaction } from 'mobx';
import { container } from 'tsyringe';

class CanvasControllerStore {
  engine: IEngine | null = null;

  displayMode: CanvasDisplayMode = CanvasDisplayMode.PC;
  mobileModel: MobileModel = MobileModel.IPhone12_Pro;
  undoDisabled = true;
  redoDisabled = true;

  constructor() {
    makeAutoObservable(this);
  }

  get isPcPlatform() {
    return this.displayMode === CanvasDisplayMode.PC;
  }

  setCanvasDisplayMode(type: CanvasDisplayMode) {
    this.displayMode = type;
  }

  setMobileModel(model: MobileModel) {
    this.mobileModel = model;
  }

  init(engine: IEngine) {
    this.engine = engine;
    this.engine.docTreeModel.schemaSnapshots.on(EventName.SnapshotsPointerChange, () => {
      this.undoDisabled = !this.engine?.docTreeModel.schemaSnapshots.canUndo();
      this.redoDisabled = !this.engine?.docTreeModel.schemaSnapshots.canRedo();
    });

    return reaction(
      () => ({
        mode: this.displayMode,
        screenSize: mobileModelToSize[this.mobileModel],
      }),
      (data) => {
        this.engine?.setCanvasDisplayModel(data);
      },
      {
        fireImmediately: true,
      },
    );
  }
}

export default container.resolve(CanvasControllerStore);
