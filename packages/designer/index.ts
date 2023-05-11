import { EventName } from '@miracle/constants';
import Dragon, { IDragObject } from '@miracle/dragon';
import { IMaterial } from '@miracle/react-antd-materials';
import { IComponentMaterial } from '@miracle/react-core/interface';
import SchemaManager from '@miracle/schema';
import SimulatorHost from '@miracle/simulatorHost';
import { singleton } from 'tsyringe';

export interface IEngine {
  schemaManager: SchemaManager;
  dragon: Dragon;
  getComponentBySchema: (materials: IMaterial[], info: IDragObject) => IComponentMaterial | undefined;
}

@singleton()
export default class DesigneEngine implements IEngine {
  constructor(public schemaManager: SchemaManager, public dragon: Dragon, public simulatorHost: SimulatorHost) {
    this.simulatorHost.on(EventName.IFrameLoaded, (window) => {
      console.log('IFrameLoaded', window);
      // eslint-disable-next-line
      window.designerEngine = this;
    });
  }

  getComponentBySchema(materials: IMaterial[], info: IDragObject) {
    const group = materials.find((item) => item.group === info.group);
    return group?.items.find((item) => item.name === info.name);
  }
}
