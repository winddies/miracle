import { IEngine } from '@miracle/designer';
import { materials } from '@miracle/react-antd-materials';
import { makeAutoObservable } from 'mobx';
import { container, singleton } from 'tsyringe';
import { getEngine } from './util';

@singleton()
class SimulatorStore {
  designerEngine: IEngine | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get componentData() {
    return this.designerEngine?.schemaManager?.schema.children.map((item: any) => {
      const component = this.designerEngine?.getComponentBySchema(materials, item);
      return {
        component,
        attributes: item.attributes,
        slots: item.slots,
      };
    });
  }

  init = () => {
    this.designerEngine = getEngine();
    makeAutoObservable(this.designerEngine);
    // 因为这里的 schemaManager 是一个 class，所以需要使用 makeAutoObservable 来将其转换为 observable class
    makeAutoObservable(this.designerEngine.schemaManager);
  };
}

export default container.resolve(SimulatorStore);
