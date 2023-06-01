import { ContainerType, EventName } from '@miracle/constants';
import DocTreeModel from '@miracle/docTreeModel';
import Dragon from '@miracle/dragon';
import { IMaterial } from '@miracle/react-antd-materials';
import { ISchema } from '@miracle/react-core/interface';
import SimulatorHost from '@miracle/simulator/host';
import ReactDomCollector from '@miracle/simulator/reactInstanceCollector';
import { singleton } from 'tsyringe';

export interface IEngine {
  dragon: Dragon;
  docTreeModel: DocTreeModel;
  simulatorHost: SimulatorHost;
  reactDomCollector: ReactDomCollector;
  getComponentBySchema: (materials: IMaterial[], schema: ISchema) => React.FC<any> | React.ComponentClass | null;
}

const defaultSchema = {
  name: 'root',
  isContainer: true,
  containerType: ContainerType.Page,
  children: [],
};

@singleton()
export default class DesigneEngine implements IEngine {
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

  getComponentBySchema(materials: IMaterial[], schema: ISchema) {
    const group = materials.find((item) => item.group === schema.group);
    const material = group?.items.find((item) => item.name === schema.componentName);
    return material?.component || null;
  }
}
