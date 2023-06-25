import { DragObjectType, EventName, InsertSide } from '@miracle/constants';
import { IComponentMaterial } from '@miracle/react-core';
import EventEmitter from 'eventemitter3';
import { singleton } from 'tsyringe';
import DocTreeModel from './doc-tree';
import Node from './doc-tree/node';
import { isInlineDom } from './utils';

export type DragObject =
  | { type: DragObjectType.Node; data: Node }
  | { type: DragObjectType.Resource; data: IComponentMaterial };

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

  bindResource(ele: HTMLElement, data: IComponentMaterial) {
    this.bindElements.push(ele);
    const { behaviorRule } = data;
    if (behaviorRule?.draggable) {
      ele.setAttribute('draggable', 'true');
      this.attachDragEvent(ele, data);
    }

    if (behaviorRule?.droppable) {
      // this.attachDropEvent(ele);
    }
  }

  onResourceDragStart(data: IComponentMaterial) {
    this.dragging = true;
    this.dragObject = { data, type: DragObjectType.Resource };
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

  onDragLeave = () => {
    this.dropLocation = null;
    this.emit(EventName.DragLeave);
  };

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

    const closetNodeMaterial = closetWrapperNode.exportNodeMaterial();
    if (!closetNodeMaterial) return null;
    const { isContainer } = closetNodeMaterial;

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

    // 3. 容器内有子节点，那么找到 point 上方最近的一个子节点
    if (isContainer && closetWrapperNode.children.length > 0) {
      const childMap = new Map<string, Node>();
      for (const child of closetWrapperNode.children) {
        childMap.set(child.id, child);
      }

      // 找出距离最近的一个子节点
      const closetChildNode = this.getMinDistanceNode(childMap, dragPoint);
      // if (!closetChildNode) {

      // }

      if (!closetChildNode || isSameNode(closetChildNode)) return null;
      let insertNodeSide: InsertSide | null = null;

      const { bottom, top, right, left } = closetChildNode.getBoundingClientRect() as DOMRect;
      const originDom = closetChildNode.getOriginDom();
      if (!originDom) return null;

      if (isInlineDom(originDom)) {
        if (dragPoint.clientY < top) {
          insertNodeSide = InsertSide.Left;
        } else {
          insertNodeSide = dragPoint.clientX > (left + right) / 2 ? InsertSide.Right : InsertSide.Left;
        }
      } else {
        insertNodeSide = dragPoint.clientY > (top + bottom) / 2 ? InsertSide.Bottom : InsertSide.Top;
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

  attachDragEvent(ele: HTMLElement, data: IComponentMaterial) {
    ele.addEventListener('dragstart', () => this.onResourceDragStart(data));
    ele.addEventListener('dragend', this.onDragEnd);
    ele.addEventListener('dragover', this.onDragOver);
  }

  // 找到 x 方向离 point 最近的节点
  getMinXDistanceNode(map: Map<string, Node>, point: IPointLocation) {
    if (map.size === 1) return map.values().next().value;

    let minXDistance = Infinity;
    let minXDistanceNode: Node | null = null;
    for (const node of map.values()) {
      const rect = node.getBoundingClientRect();
      if (!rect) continue;

      const { left, right } = rect;

      if (point.clientX > right) {
        const distance = Math.abs(point.clientX - right);
        if (distance < minXDistance) {
          minXDistance = distance;
          minXDistanceNode = node;
        }
      } else if (point.clientX < left) {
        const distance = Math.abs(point.clientX - left);
        if (distance < minXDistance) {
          minXDistance = distance;
          minXDistanceNode = node;
        }
      }
    }
    return minXDistanceNode;
  }

  getParallelXNode(yContainMap: Map<string, Node>, map: Map<string, Node>, point: IPointLocation) {
    if (yContainMap.size === 0) return null;

    const minXDistanceNode = this.getMinXDistanceNode(yContainMap, point) as Node;

    if (minXDistanceNode == null) return null;

    const xLeft = (minXDistanceNode.getBoundingClientRect() as DOMRect).left;
    const xRight = (minXDistanceNode.getBoundingClientRect() as DOMRect).right;
    const xTop = (minXDistanceNode.getBoundingClientRect() as DOMRect).top;
    const xBottom = (minXDistanceNode.getBoundingClientRect() as DOMRect).bottom;

    if (point.clientX > xRight) {
      for (const node of map.values()) {
        if (node === minXDistanceNode) continue;
        const { left, top, bottom } = node.getBoundingClientRect() as DOMRect;
        if (left >= xRight && left < point.clientX && bottom > xTop && top < xBottom) {
          return null;
        }
      }
    }

    if (point.clientX < xLeft) {
      for (const node of map.values()) {
        if (node === minXDistanceNode) continue;
        const { right, top, bottom } = node.getBoundingClientRect() as DOMRect;
        if (right <= xLeft && right > point.clientX && bottom > xTop && top < xBottom) {
          return null;
        }
      }
    }

    return minXDistanceNode;
  }

  getInterceptionMap(map: Map<string, Node>, targetNode: Node) {
    const minYDistanceNodeTop = (targetNode.getBoundingClientRect() as DOMRect).top;
    const minYDistanceNodeBottom = (targetNode.getBoundingClientRect() as DOMRect).bottom;

    const intersectionYMap = new Map<string, Node>();
    for (const [id, node] of map) {
      const rect = node.getBoundingClientRect();
      if (!rect) continue;
      const { bottom, top } = rect;
      if (bottom > minYDistanceNodeTop && top < minYDistanceNodeBottom) {
        intersectionYMap.set(id, node);
      }
    }

    return intersectionYMap;
  }

  getMinXNodeInIntersectionMap(point: IPointLocation, intersectionYMap: Map<string, Node>) {
    let minXDistance = Infinity;
    let minXDistanceNode: Node | null = null;

    for (const node of intersectionYMap.values()) {
      const { left, right } = node.getBoundingClientRect() as DOMRect;
      if (point.clientX >= left && point.clientX <= right) {
        minXDistanceNode = node;
        break;
      }

      if (point.clientX > right) {
        const distance = Math.abs(point.clientX - right);
        if (distance < minXDistance) {
          minXDistance = distance;
          minXDistanceNode = node;
        }
      } else if (point.clientX < left) {
        const distance = Math.abs(point.clientX - left);
        if (distance < minXDistance) {
          minXDistance = distance;
          minXDistanceNode = node;
        }
      }
    }

    return minXDistanceNode;
  }

  getTopMinDistanceNode(map: Map<string, Node>, point: IPointLocation) {
    let minYDistance = Infinity;
    let minYDistanceNode: Node | null = null;
    for (const node of map.values()) {
      const rect = node.getBoundingClientRect();
      if (!rect) continue;
      const { bottom } = rect;
      // 找到 y 方向离 point 最近的节点
      const distance = Math.abs(point.clientY - bottom);
      if (distance < minYDistance) {
        minYDistance = distance;
        minYDistanceNode = node;
      }
    }

    if (!minYDistanceNode) return null;
    // 对于 minYDistanceNode，找出跟该 node y 轴相交的节点集合
    const intersectionYMap = this.getInterceptionMap(map, minYDistanceNode);

    // 如果没有相交的点集合，则直接返回 minYDistanceNode
    if (intersectionYMap.size === 0) return minYDistanceNode;

    // 如果有相交的点集合，则找到 x 方向离 point 最近的点
    return this.getMinXNodeInIntersectionMap(point, intersectionYMap);
  }

  getBottomMinDistanceNode(map: Map<string, Node>, point: IPointLocation) {
    let minYDistance = Infinity;
    let minYDistanceNode: Node | null = null;
    for (const node of map.values()) {
      const rect = node.getBoundingClientRect();
      if (!rect) continue;
      const { top } = rect;
      // 找到 y 方向离 point 最近的节点
      const distance = Math.abs(point.clientY - top);
      if (distance < minYDistance) {
        minYDistance = distance;
        minYDistanceNode = node;
      }
    }

    if (!minYDistanceNode) return null;
    // 对于 minYDistanceNode，找出跟该 node y 轴相交的节点集合
    const intersectionYMap = this.getInterceptionMap(map, minYDistanceNode);

    // 如果没有相交的点集合，则直接返回 minYDistanceNode
    if (intersectionYMap.size === 0) return minYDistanceNode;

    // 如果有相交的点集合，则找到 x 方向离 point 最近的点
    return this.getMinXNodeInIntersectionMap(point, intersectionYMap);
  }

  getMinDistanceNode(map: Map<string, Node>, point: IPointLocation) {
    // 1. 找到 point 上方的节点集合，下方的节点集合及包含 point 的节点的结合
    const topMap = new Map<string, Node>();
    const yContainMap = new Map<string, Node>();
    const bottomMap = new Map<string, Node>();
    for (const [id, node] of map) {
      const { bottom, top } = node.getBoundingClientRect() as DOMRect;
      if (bottom < point.clientY) {
        topMap.set(id, node);
      }

      if (bottom > point.clientY && top < point.clientY) {
        yContainMap.set(id, node);
      }

      bottomMap.set(id, node);
    }

    // 2. 找到 y 方向包含 point 的节点并且该节点与 point 之间没有隔挡的节点
    const parallelXNode = this.getParallelXNode(yContainMap, map, point);
    if (parallelXNode) return parallelXNode;

    if (topMap.size > 0) {
      return this.getTopMinDistanceNode(topMap, point);
    }

    if (bottomMap.size > 0) {
      return this.getBottomMinDistanceNode(bottomMap, point);
    }

    // 3. 在 topMap 中找到 y 方向离 point 最近的点
  }

  // getMinDistanceNode(map: Map<string, Node>, point: IPointLocation) {
  //   // 沿 y 轴平行并且 x 范围包含 point 的 dom
  //   const parallelYMap = new Map<string, Node>();
  //   // 沿 x 轴平行并且 y 范围包含 point 的 dom
  //   const parallelXMap = new Map<string, Node>();
  //   // 沿 x 轴平行并且 y 范围不包含 point 的 dom
  //   const parallelXNotContainYMap = new Map<string, Node>();

  //   for (const [id, node] of map) {
  //     const { top, bottom, left, right } = node.getBoundingClientRect() as DOMRect;
  //     if (point.clientY > top && point.clientY < bottom) {
  //       parallelXMap.set(id, node);
  //       continue;
  //     }

  //     if (point.clientY > bottom || point.clientY < top) {
  //       if (point.clientX > left && point.clientX < right) {
  //         parallelYMap.set(id, node);
  //       } else {
  //         parallelXNotContainYMap.set(id, node);
  //       }
  //     }
  //   }

  //   if (parallelXMap.size > 0) {
  //     // 找到 point x 轴上最近的一个 dom
  //     let minDistance = Infinity;
  //     let minDistanceId = '';
  //     for (const [id, node] of parallelXMap) {
  //       const rect = node.getBoundingClientRect();
  //       if (!rect) continue;

  //       const { left, right } = rect;
  //       if (point.clientX > right) {
  //         const distance = Math.abs(point.clientX - right);
  //         if (distance < minDistance) {
  //           minDistance = distance;
  //           minDistanceId = id;
  //         }
  //       } else if (point.clientX < left) {
  //         const distance = Math.abs(point.clientX - left);
  //         if (distance < minDistance) {
  //           minDistance = distance;
  //           minDistanceId = id;
  //         }
  //       }
  //     }
  //     return parallelXMap.get(minDistanceId);
  //   }

  //   if (parallelYMap.size > 0) {
  //     let minDistance = Infinity;
  //     let minDistanceId = '';
  //     for (const [id, node] of parallelYMap) {
  //       const rect = node.getBoundingClientRect();
  //       if (!rect) continue;
  //       const { top, bottom } = rect;
  //       if (point.clientY > bottom) {
  //         const distance = Math.abs(point.clientY - bottom);
  //         if (distance < minDistance) {
  //           minDistance = distance;
  //           minDistanceId = id;
  //         }
  //       } else if (point.clientY < top) {
  //         const distance = Math.abs(point.clientY - top);
  //         if (distance < minDistance) {
  //           minDistance = distance;
  //           minDistanceId = id;
  //         }
  //       }
  //     }
  //     return parallelYMap.get(minDistanceId);
  //   }

  //   let minDistance = Infinity;
  //   let minDistanceId = '';
  //   for (const [id, node] of parallelXNotContainYMap) {
  //     const rect = node.getBoundingClientRect();
  //     if (!rect) continue;
  //     const { left, right } = rect;
  //     if (point.clientX > right) {
  //       const distance = Math.abs(point.clientX - right);
  //       if (distance < minDistance) {
  //         minDistance = distance;
  //         minDistanceId = id;
  //       }
  //     } else if (point.clientX < left) {
  //       const distance = Math.abs(point.clientX - left);
  //       if (distance < minDistance) {
  //         minDistance = distance;
  //         minDistanceId = id;
  //       }
  //     }
  //   }
  //   return parallelXNotContainYMap.get(minDistanceId);
  // }
}
