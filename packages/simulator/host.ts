import { DragObjectType, EventName, MIRACLE_NODE_ID } from '@miracle/constants';
import DocTreeModel from '@miracle/docTreeModel';
import Node from '@miracle/docTreeModel/node';
import Dragon from '@miracle/dragon';
import { EventEmitter } from 'eventemitter3';
import { singleton } from 'tsyringe';

@singleton()
export default class SimulatorHost extends EventEmitter {
  iframeDocument: Document | null;
  iframeWindow: Window | null;

  constructor(public docTreeModel: DocTreeModel, public dragon: Dragon) {
    super();
  }

  getNodeByDomElement(ele: HTMLElement) {
    const id = ele.getAttribute(MIRACLE_NODE_ID);
    return id ? this.docTreeModel.getNodeById(id) : null;
  }

  setSelectedNode(node: Node | null) {
    this.docTreeModel.setSelectedNode(node);
    this.emit(EventName.SelectNode);
  }

  setHoverNode(node: Node | null) {
    this.docTreeModel.setHoverNode(node);
    this.emit(EventName.HoverNode, node);
  }

  setupEvent() {
    this.iframeDocument?.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.dragon.onDragOver(e);
    });

    this.iframeDocument?.addEventListener('dragstart', (e) => {
      const node = this.getNodeByDomElement(e.target as HTMLElement);
      if (node) {
        this.dragon.onDragStart({
          type: DragObjectType.Node,
          data: node,
        });

        this.setSelectedNode(node);
      }
    });

    this.iframeDocument?.addEventListener('dragend', (e) => {
      this.dragon.onDragEnd();
    });

    this.iframeDocument?.addEventListener('mouseup', (e) => {
      const pointLocation = {
        clientX: e.clientX,
        clientY: e.clientY,
      };

      const node = this.docTreeModel.getClosetWrapperNodeByLocation(pointLocation);

      if (node === this.docTreeModel.rootNode || !node) {
        this.setSelectedNode(null);
      } else {
        this.setSelectedNode(node);
      }
    });

    this.iframeDocument?.addEventListener('mousemove', (e) => {
      const pointLocation = {
        clientX: e.clientX,
        clientY: e.clientY,
      };

      const node = this.docTreeModel.getClosetWrapperNodeByLocation(pointLocation);

      if (node === this.docTreeModel.rootNode || node === this.docTreeModel.selectedNode || !node) {
        this.setHoverNode(null);
      } else {
        this.setHoverNode(node);
      }
    });

    this.iframeDocument?.addEventListener('drop', async () => {
      const { dragObject, dropLocation } = this.dragon;
      if (!dragObject || !dropLocation) return;

      let selectedNode;

      const dropEmit = () => {
        return new Promise((resolve) => {
          this.emit(EventName.Drop, resolve);
          this.dragon.onDragEnd();
        });
      };

      // 落入点是否是空容器
      if (dropLocation.isEmptyContainer) {
        if (dragObject.type === DragObjectType.Node) {
          const drageNode = dragObject.data;
          drageNode.parent?.removeChild(drageNode);
          dropLocation.node.insertChildAtLast(drageNode);
          selectedNode = drageNode;
        } else {
          const newNode = this.docTreeModel.createNode(dragObject.data);
          dropLocation.node.insertChildAtLast(newNode);
          selectedNode = newNode;
        }

        await dropEmit();
        this.setSelectedNode(selectedNode);
        return;
      }

      const { insertIndex, insertNodeSide } = dropLocation;

      if (insertNodeSide == null || insertIndex == null) return;

      if (dragObject.type === DragObjectType.Node) {
        const drageNode = dragObject.data;
        drageNode.parent?.removeChild(drageNode);
        dropLocation.node.parent?.insertChildAtIndex(drageNode, insertIndex);
        selectedNode = drageNode;
      } else {
        const newNode = this.docTreeModel.createNode(dragObject.data);
        dropLocation.node.parent?.insertChildAtIndex(newNode, insertIndex);
        selectedNode = newNode;
      }

      await dropEmit();
      this.setSelectedNode(selectedNode);
    });
  }

  init(iframe: HTMLIFrameElement) {
    iframe.addEventListener('load', () => {
      this.iframeDocument = iframe.contentDocument;
      this.iframeWindow = iframe.contentWindow;
      this.emit(EventName.IFrameLoaded, this.iframeWindow);
      this.setupEvent();
    });
  }
}

// container.register('SimulatorHost', { useClass: SimulatorHost }, { lifecycle: Lifecycle.Singleton });
