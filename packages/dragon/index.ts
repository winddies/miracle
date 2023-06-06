import { DisplayType, DragObjectType, EventName } from '@miracle/constants';
import DocTreeModel from '@miracle/docTreeModel';
import Node from '@miracle/docTreeModel/node';
import { ISchema } from '@miracle/react-core/interface/material';
import EventEmitter from 'eventemitter3';
import { uniqueId } from 'lodash';
import { singleton } from 'tsyringe';
import { InsertSide } from './../constants/index';

export type DragObject = { type: DragObjectType.Node; data: Node } | { type: DragObjectType.Resource; data: ISchema };

export interface IPointLocation {
  clientX: number;
  clientY: number;
}

export interface IDropLocation {
  node: Node;
  insertNodeSide: InsertSide | null;
  isEmptyContainer?: boolean;
  insertIndex?: number;
}

@singleton()
export default class Dragon extends EventEmitter {
  dragObject: DragObject | null = null;
  dragging = false;
  bindElements: HTMLElement[] = [];
  dropLocation: IDropLocation | null = null;

  constructor(private docTreeModel: DocTreeModel) {
    super();
  }

  bindResource(ele: HTMLElement, schema: ISchema) {
    this.bindElements.push(ele);
    const { behaviorRule } = schema;
    if (behaviorRule?.draggable) {
      ele.setAttribute('draggable', 'true');
      this.attachDragEvent(ele, schema);
    }

    if (behaviorRule?.droppable) {
      // this.attachDropEvent(ele);
    }
  }

  onResourceDragStart(e: DragEvent, schema: ISchema) {
    this.dragging = true;
    this.dragObject = { data: schema, type: DragObjectType.Resource };
  }

  onDragStart = (dragObject: DragObject | null) => {
    this.dragging = true;
    this.dragObject = dragObject;
  };

  onDragEnd = () => {
    this.dragging = false;
    this.dragObject = null;
    this.dropLocation = null;
    this.emit(EventName.DragEnd);
  };

  onDrop(e: any) {
    const id = uniqueId();
    // console.log('drop ##', this.dragE, e.target);
  }

  onDragOver(e: DragEvent) {
    if (this.dragObject) {
      const dragPoint = {
        clientX: e.clientX,
        clientY: e.clientY,
      };

      this.dropLocation = this.createDropPositionByLocation(dragPoint);
    }
  }

  createDropPositionByLocation(dragPoint: IPointLocation) {
    const isSameNode = (node: Node) => this.dragObject?.data === node;

    // 1. 找出包含当前 point 的最近的一个 node
    const closetWrapperNode = this.docTreeModel.getClosetWrapperNodeByLocation(dragPoint);
    if (!closetWrapperNode || isSameNode(closetWrapperNode)) return null;

    const nodeSchema = closetWrapperNode.exportSchema();
    const { isContainer } = nodeSchema;

    // 2. 假如 node 是容器，且容器内没有子节点，那么直接插入到容器内
    if (isContainer && closetWrapperNode.children.length === 0) {
      const dropPositionInfo = {
        node: closetWrapperNode,
        isEmptyContainer: true,
        insertNodeSide: InsertSide.ALL,
      };
      this.emit(EventName.CreateDropPosition, dropPositionInfo);

      return dropPositionInfo;
    }

    // 3. 容器内有子节点，那么找到最近的一个子节点
    if (isContainer && closetWrapperNode.children.length > 0) {
      const childMap = new Map<string, Node>();
      for (const child of closetWrapperNode.children) {
        childMap.set(child.id, child);
      }

      // 找出距离最近的一个子节点
      const closetChildNode = this.getMinDistanceNode(childMap, dragPoint);

      if (!closetChildNode || isSameNode(closetChildNode)) return null;
      let insertNodeSide: InsertSide | null = null;

      const { bottom, top, right, left } = closetChildNode.getBoundingClientRect() as DOMRect;
      const schema = closetChildNode.exportSchema();
      const { display } = schema;
      if (display === DisplayType.Inline) {
        insertNodeSide = dragPoint.clientX > (left + right) / 2 ? InsertSide.Right : InsertSide.Left;
      } else if (dragPoint.clientY < top) {
        insertNodeSide = InsertSide.Top;
      } else if (dragPoint.clientY > bottom) {
        insertNodeSide = InsertSide.Bottom;
      } else if (dragPoint.clientX < left) {
        insertNodeSide = InsertSide.Left;
      } else if (dragPoint.clientX > right) {
        insertNodeSide = InsertSide.Right;
      }

      const nodePositionAtContainer = closetChildNode?.parent?.children.indexOf(closetChildNode);
      if (nodePositionAtContainer == null || insertNodeSide == null) return null;

      const insertIndex = [InsertSide.Top, InsertSide.Left].includes(insertNodeSide)
        ? nodePositionAtContainer
        : nodePositionAtContainer + 1;
      const dropPositionInfo = {
        node: closetChildNode,
        insertNodeSide: insertNodeSide as InsertSide,
        insertIndex,
      };

      this.emit(EventName.CreateDropPosition, dropPositionInfo);

      return dropPositionInfo;
    }

    // 4. 非容器的节点处理
    let insertNodeSide: InsertSide | null = null;

    const { height, width, top, left } = closetWrapperNode.getBoundingClientRect() as DOMRect;

    // 上对角线及下对角线的方程式
    const lowerDiagonalEquation = (x: number) => (height / width) * x;
    const upperDiagonalEquation = (x: number) => (-height / width) * x + height;

    const x = dragPoint.clientX - left;
    const y = dragPoint.clientY - top;

    const lowerDiagonalYValue = lowerDiagonalEquation(x);
    const upperDiagonalYValue = upperDiagonalEquation(x);

    if (y < lowerDiagonalYValue && y < upperDiagonalYValue) {
      insertNodeSide = InsertSide.Top;
    }

    if (y > upperDiagonalYValue && y > lowerDiagonalYValue) {
      insertNodeSide = InsertSide.Bottom;
    }

    if (y > lowerDiagonalYValue && y < upperDiagonalYValue) {
      insertNodeSide = InsertSide.Left;
    }

    if (y > upperDiagonalYValue && y < lowerDiagonalYValue) {
      insertNodeSide = InsertSide.Right;
    }

    // 对于非容器的，需要找到其父容器，然后根据该 closetNode 在父容器内的位置以及 insertSide 决定插入到父容器的位置
    const nodePositionAtContainer = closetWrapperNode?.parent?.children.indexOf(closetWrapperNode);
    if (nodePositionAtContainer == null || insertNodeSide == null) return null;

    const insertIndex = [InsertSide.Top, InsertSide.Left].includes(insertNodeSide)
      ? nodePositionAtContainer
      : nodePositionAtContainer + 1;

    const dropPositionInfo = {
      node: closetWrapperNode,
      insertNodeSide: insertNodeSide as InsertSide,
      insertIndex,
    };

    this.emit(EventName.CreateDropPosition, dropPositionInfo);
    return dropPositionInfo;
  }

  attachDragEvent(ele: HTMLElement, schema: ISchema) {
    ele.addEventListener('dragstart', (e) => this.onResourceDragStart(e, schema));
    ele.addEventListener('dragend', this.onDragEnd);
    ele.addEventListener('dragover', this.onDragOver);
  }

  // 计算 point 离哪个矩形更近
  getMinDistanceNode(map: Map<string, Node>, point: IPointLocation) {
    // y 轴平行的 dom
    const parallelYMap = new Map<string, Node>();
    // x 轴平行的 dom
    const parallelXMap = new Map<string, Node>();
    for (const [id, node] of map) {
      const { top, bottom } = node.getBoundingClientRect() as DOMRect;
      if (point.clientY > top && point.clientY < bottom) {
        parallelXMap.set(id, node);
        continue;
      }

      if (point.clientY > bottom || point.clientY < top) {
        parallelYMap.set(id, node);
      }
    }

    if (parallelXMap.size > 0) {
      // 先找到 point x 轴上最近的一个 dom
      let minDistance = Infinity;
      let minDistanceId = '';
      for (const [id, node] of parallelXMap) {
        const rect = node.getBoundingClientRect();
        if (!rect) continue;

        const { left, right } = rect;
        if (point.clientX > right) {
          const distance = Math.abs(point.clientX - right);
          if (distance < minDistance) {
            minDistance = distance;
            minDistanceId = id;
          }
        } else if (point.clientX < left) {
          const distance = Math.abs(point.clientX - left);
          if (distance < minDistance) {
            minDistance = distance;
            minDistanceId = id;
          }
        }
      }
      return parallelXMap.get(minDistanceId);
    }

    if (parallelYMap.size === 0) return null;

    // 在 parallelYMap 里找到 x 区间包含 point 的 dom
    const xContainMap = new Map<string, Node>();
    for (const [id, node] of parallelYMap) {
      const rect = node.getBoundingClientRect();
      if (!rect) continue;
      const { left, right } = rect;
      if (point.clientX > left && point.clientX < right) {
        xContainMap.set(id, node);
      }
    }

    // 如果没有 x 区间包含 point 的 dom，则找到 point x 轴上最近的一个 dom
    if (xContainMap.size === 0) {
      let minDistance = Infinity;
      let minDistanceId = '';
      for (const [id, node] of parallelYMap) {
        const rect = node.getBoundingClientRect();
        if (!rect) continue;
        const { left, right } = rect;
        if (point.clientX > right) {
          const distance = Math.abs(point.clientX - right);
          if (distance < minDistance) {
            minDistance = distance;
            minDistanceId = id;
          }
        } else if (point.clientX < left) {
          const distance = Math.abs(point.clientX - left);
          if (distance < minDistance) {
            minDistance = distance;
            minDistanceId = id;
          }
        }
      }
      return parallelYMap.get(minDistanceId);
    }

    let minDistance = Infinity;
    let minDistanceId = '';
    for (const [id, node] of xContainMap) {
      const rect = node.getBoundingClientRect();
      if (!rect) continue;
      const { top, bottom } = rect;
      if (point.clientY > bottom) {
        const distance = Math.abs(point.clientY - bottom);
        if (distance < minDistance) {
          minDistance = distance;
          minDistanceId = id;
        }
      } else if (point.clientY < top) {
        const distance = Math.abs(point.clientY - top);
        if (distance < minDistance) {
          minDistance = distance;
          minDistanceId = id;
        }
      }
    }
    return parallelYMap.get(minDistanceId);
  }
}
