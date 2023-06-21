import { getMaterialByName } from '@miracle/antd-materials';
import { EventName, InsertSide, MIRACLE_NODE_ID } from '@miracle/constants';
import { IEngine } from '@miracle/engine';
import { ISchema } from '@miracle/react-core';
import { makeAutoObservable } from 'mobx';
import { container, singleton } from 'tsyringe';
import { getEngine, isHTMLElement } from './util';

@singleton()
class SimulatorStore {
  insertLineStyle = {};
  detectionStyle = {};
  detectionHoverStyle = {};
  actionToolsPosition = {};

  designEngine: IEngine | null = null;

  schema: ISchema | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  resolveRender: () => Promise<void> | null = () => null;

  getComponentBySchema(schema: ISchema) {
    return getMaterialByName(schema.componentName);
  }

  mountNode(id: string, reactDom: HTMLElement | null) {
    let dom = reactDom;

    const isElement = isHTMLElement(dom);
    if (!isElement) {
      dom = document.querySelector(`[${MIRACLE_NODE_ID}=${id}]`);
    }

    if (!dom) {
      throw new Error('mountNode: dom is null');
    }

    dom?.setAttribute(MIRACLE_NODE_ID, id);
    this.designEngine?.reactDomCollector.mount(id, dom);
  }

  update() {
    this.schema = this.designEngine?.docTreeModel.getSchema() || null;
  }

  remove() {
    const { selectedNode } = this.designEngine?.docTreeModel || {};
    if (selectedNode) {
      this.designEngine?.docTreeModel.removeNode(selectedNode);
      this.update();
      this.detectionStyle = {};
    }
  }

  setDetectionStyle() {
    const { selectedNode } = this.designEngine?.docTreeModel || {};
    if (!selectedNode) {
      this.detectionStyle = {};
    } else {
      const { left, top, width, height } = selectedNode?.getBoundingClientRect() as DOMRect;
      this.detectionStyle = {
        width,
        height,
        left,
        top,
        outline: '2px solid #1677ff',
      };
      this.actionToolsPosition = {
        positionStyle: {
          top: top < 20 ? 'auto' : '-17px',
          bottom: top < 20 ? '-17px' : 'auto',
        },
        placement: left >= 0 ? 'right' : 'left',
      };
    }
  }

  setDetectionHoverStyle() {
    const { hoveredNode } = this.designEngine?.docTreeModel || {};
    if (!hoveredNode) {
      this.detectionHoverStyle = {};
    } else {
      const { left, top, width, height } = hoveredNode.getBoundingClientRect() as DOMRect;
      this.detectionHoverStyle = {
        width,
        height,
        left,
        top,
        outline: '1px dashed #1677ff',
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
    this.designEngine = getEngine();
    if (this.designEngine) {
      this.designEngine.simulatorHost.on(EventName.Drop, (resolve) => {
        this.update();
        this.resolveRender = resolve;
      });

      this.designEngine.docTreeModel.on(EventName.NodePropsChange, () => {
        this.update();

        // 这里需要延迟一下才能获取到正确的位置，不然可能获取的位置属于样式变化的中间状态
        setTimeout(() => {
          this.setDetectionStyle();
        }, 200);
      });

      this.designEngine.simulatorHost.on(EventName.SelectNode, () => {
        this.setDetectionStyle();
      });

      this.designEngine.simulatorHost.on(EventName.HoverNode, () => {
        this.setDetectionHoverStyle();
      });

      this.designEngine.dragon.on(EventName.CreateDropPosition, (data) => {
        this.setInsertLineStyle(data);
      });

      this.designEngine.dragon.on(EventName.DragEnd, () => {
        this.setInsertLineStyle();
      });

      this.update();
    }
  };
}

export default container.resolve(SimulatorStore);
