import 'reflect-metadata';

import { ContainerType, EventName } from '@miracle/constants';
import { container, singleton } from 'tsyringe';
import DocTreeModel from './doc-tree';
import ReactDomCollector from './doc-tree/reactInstanceCollector';
import Dragon from './dragon';
import SimulatorHost from './simulator/host';

export interface IEngine {
  dragon: Dragon;
  docTreeModel: DocTreeModel;
  simulatorHost: SimulatorHost;
  reactDomCollector: ReactDomCollector;
  init: (schema: any) => void;
  // getComponentBySchema: (materials: IMaterial[], schema: ISchema) => React.FC<any> | React.ComponentClass | null;
}

const defaultSchema = {
  name: 'Root',
  isContainer: true,
  containerType: ContainerType.Page,
  children: [],
};

@singleton()
class DesignEngine implements IEngine {
  constructor(
    public dragon: Dragon,
    public simulatorHost: SimulatorHost,
    public reactDomCollector: ReactDomCollector,
    public docTreeModel: DocTreeModel,
  ) {
    this.simulatorHost.on(EventName.IFrameLoaded, (window) => {
      // eslint-disable-next-line
      window.designerEngine = this;
    });
  }

  init(schema = defaultSchema) {
    this.docTreeModel.createFromSchema(schema);
  }

  // getComponentBySchema(materials: IMaterial[], schema: ISchema) {
  //   const group = materials.find((item) => item.group === schema.group);
  //   const material = group?.items.find((item) => item.name === schema.componentName);
  //   return material?.component || null;
  // }
}

export default container.resolve(DesignEngine);
