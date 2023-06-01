import DesignEngine from '@miracle/engine';
import SimulatorHost from '@miracle/simulator/host';
import { makeAutoObservable } from 'mobx';
import { container, injectable } from 'tsyringe';

@injectable()
class FrameEditorRender {
  constructor(public designEngine: DesignEngine, private simulatorHost: SimulatorHost) {
    makeAutoObservable(this);
  }

  init(iframe: HTMLIFrameElement) {
    this.simulatorHost.init(iframe);
  }
}

export default container.resolve(FrameEditorRender);
