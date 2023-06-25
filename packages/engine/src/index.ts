import 'reflect-metadata';

import { ContainerType, EventName } from '@miracle/constants';
import { ICanvasDisplayModel } from '@miracle/react-core';
import EventEmitter from 'eventemitter3';
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
  setCanvasDisplayModel: (data: ICanvasDisplayModel) => void;
  // getComponentBySchema: (materials: IMaterial[], schema: ISchema) => React.FC<any> | React.ComponentClass | null;
}

const defaultSchema = {
  name: 'Root',
  isContainer: true,
  containerType: ContainerType.Page,
  children: [],
};

@singleton()
class DesignEngine extends EventEmitter implements IEngine {
  displayModel: ICanvasDisplayModel;

  constructor(
    public dragon: Dragon,
    public simulatorHost: SimulatorHost,
    public reactDomCollector: ReactDomCollector,
    public docTreeModel: DocTreeModel,
  ) {
    super();
    this.simulatorHost.on(EventName.IFrameLoaded, (window) => {
      // eslint-disable-next-line
      window.designerEngine = this;
    });
  }

  init(schema = defaultSchema) {
    this.docTreeModel.createFromSchema(schema);
  }

  setCanvasDisplayModel(data: ICanvasDisplayModel) {
    this.displayModel = data;
    this.emit(EventName.CanvasSizeChange);
  }

  // getComponentBySchema(materials: IMaterial[], schema: ISchema) {
  //   const group = materials.find((item) => item.group === schema.group);
  //   const material = group?.items.find((item) => item.name === schema.componentName);
  //   return material?.component || null;
  // }
}

export default container.resolve(DesignEngine);
