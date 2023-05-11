import ProjectDesigner from '@miracle/designer';
import SimulatorHost from '@miracle/simulatorHost';
import { makeAutoObservable } from 'mobx';
import { container, injectable } from 'tsyringe';

@injectable()
class FrameEditorRender {
  constructor(public projectDesinger: ProjectDesigner, private simulatorHost: SimulatorHost) {
    makeAutoObservable(this);
  }

  data = {};

  init(iframe: HTMLIFrameElement) {
    const a = this.projectDesinger.schemaManager;
    const b = this.simulatorHost.schemaManager;
    console.log('a === b', a === b);
    this.simulatorHost.init(iframe);
  }
}

export default container.resolve(FrameEditorRender);
