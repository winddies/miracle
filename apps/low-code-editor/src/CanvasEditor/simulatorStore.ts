import { EventName, InsertSide, MIRACLE_NODE_ID } from '@miracle/constants';
import { IEngine } from '@miracle/engine';
import { materials } from '@miracle/react-antd-materials';
import { ISchema } from '@miracle/react-core/interface';
import { makeAutoObservable } from 'mobx';
import { container, singleton } from 'tsyringe';
import { getEngine, isHTMLElement } from './util';

@singleton()
class SimulatorStore {
  designeEngine: IEngine | null = null;

  schema: ISchema | null = null;

  resolveRender: () => Promise<void>;

  insertLineStyle = {};
  detectionStyle = {};
  detectionHoverStyle = {};

  constructor() {
    makeAutoObservable(this);
  }

  getComponentBySchema(schema: ISchema) {
    return this.designeEngine?.getComponentBySchema(materials, schema);
  }

  mountNode(id: string, reactDom: HTMLElement | null) {
    let dom = reactDom;

    const isElement = isHTMLElement(dom);
    if (!isElement) {
      dom = document.querySelector(`[${MIRACLE_NODE_ID}=${id}]`);
    }

    dom?.setAttribute(MIRACLE_NODE_ID, id);
    this.designeEngine?.reactDomCollector.mount(id, dom);
  }

  update() {
    this.schema = this.designeEngine?.docTreeModel.getSchema() || null;
  }

  setDetectionStyle() {
    const { selectedNode } = this.designeEngine?.docTreeModel || {};
    if (!selectedNode) {
      this.detectionStyle = {};
    } else {
      const { left, top, width, height } = selectedNode?.getBoundingClientRect() as DOMRect;
      this.detectionStyle = {
        width,
        height,
        left: left - 1,
        top: top - 1,
        border: '2px solid #1677ff',
        transparent: true,
      };
    }
  }

  setDetectionHoverStyle() {
    const { hoveredNode } = this.designeEngine?.docTreeModel || {};
    if (!hoveredNode) {
      this.detectionHoverStyle = {};
    } else {
      const { left, top, width, height } = hoveredNode.getBoundingClientRect() as DOMRect;
      this.detectionHoverStyle = {
        width,
        height,
        left: left - 1,
        top: top - 1,
        border: '1px dashed #1677ff',
      };
    }
  }

  setInsertLineStyle(data?: any) {
    if (!data) {
      this.insertLineStyle = {};
      return;
    }

    const { node, insertNodeSide, isEmptyContainer } = data;
    const { left, top, bottom, width, right, height } = node.getBoundingClientRect();
    if (isEmptyContainer) {
      this.insertLineStyle = {
        width,
        height,
        left,
        top,
        backgroundColor: '#d9f7be',
        opacity: 0.3,
      };

      return;
    }

    switch (insertNodeSide) {
      case InsertSide.Top:
        this.insertLineStyle = {
          width,
          height: 2,
          left,
          top: top + 1,
          backgroundColor: '#faad14',
          boxShadow: '0 -5px 8px #faad14',
        };
        break;
      case InsertSide.Right:
        this.insertLineStyle = {
          width: 2,
          height,
          left: right - 1,
          top,
          backgroundColor: '#faad14',
          boxShadow: '5px 0px 8px #faad14',
        };
        break;
      case InsertSide.Left:
        this.insertLineStyle = {
          width: 2,
          height,
          left: left + 1,
          top,
          backgroundColor: '#faad14',
          boxShadow: '-5px 0px 8px #faad14',
        };
        break;
      case InsertSide.Bottom:
        this.insertLineStyle = {
          width,
          height: 2,
          left,
          top: bottom - 1,
          backgroundColor: '#faad14',
          boxShadow: '0 5px 8px #faad14',
        };
        break;
      default:
        this.insertLineStyle = {};
    }
  }

  init = () => {
    this.designeEngine = getEngine();
    if (this.designeEngine) {
      this.designeEngine.simulatorHost.on(EventName.Drop, (resolve) => {
        this.update();
        this.resolveRender = resolve;
      });

      this.designeEngine.docTreeModel.on(EventName.NodePropsChange, () => {
        this.update();
      });

      this.designeEngine.simulatorHost.on(EventName.SelectNode, () => {
        this.setDetectionStyle();
      });

      this.designeEngine.simulatorHost.on(EventName.HoverNode, () => {
        this.setDetectionHoverStyle();
      });

      this.designeEngine.dragon.on(EventName.CreateDropPosition, (data) => {
        this.setInsertLineStyle(data);
      });

      this.designeEngine.dragon.on(EventName.DragEnd, () => {
        this.setInsertLineStyle();
      });

      this.designeEngine.docTreeModel.on(EventName.Resize, () => {
        this.setDetectionStyle();
      });

      this.update();
    }
  };
}

export default container.resolve(SimulatorStore);
