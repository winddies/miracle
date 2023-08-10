import { Edge, Graph, Path, Platform } from '@antv/x6';
import { register } from '@antv/x6-react-shape';

import { X6NodeType } from '@miracle/constants';
import { getLogicOutPortsByName } from '@miracle/logic-meta-materials';
import { IOutPort } from '@miracle/react-core';
import { uniqueId } from 'lodash';
import DataProcessingDagNode from './Node';

const registerNode = () => {
  register({
    shape: 'data-processing-node',
    width: 212,
    height: 48,
    component: DataProcessingDagNode,
    // port默认不可见
    ports: {
      groups: {
        in: {
          position: 'left',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#85A5FF',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },

        out: {
          position: {
            name: 'right',
            args: {
              dx: -96,
            },
          },

          label: {
            position: {
              name: 'right',
            },
            markup: {
              tagName: 'text',
              selector: 'text',
              attrs: {
                fill: '#000',
                fontSize: 12,
              },
            },
          },

          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#85A5FF',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
      },
    },
  });
};

Edge.config({
  markup: [
    {
      tagName: 'path',
      selector: 'wrap',
      attrs: {
        fill: 'none',
        cursor: 'pointer',
        stroke: '#52c41a',
        strokeLinecap: 'round',
      },
    },
    {
      tagName: 'path',
      selector: 'line',
      attrs: {
        fill: 'none',
        pointerEvents: 'none',
      },
    },
  ],
  connector: { name: 'curveConnector' },
  attrs: {
    wrap: {
      connection: true,
      strokeWidth: 1,
      strokeLinejoin: 'round',
    },
    line: {
      connection: true,
      stroke: '#A2B1C3',
      strokeWidth: 1,
      targetMarker: {
        name: 'classic',
        size: 6,
      },
    },
  },
});

Graph.registerConnector(
  'curveConnector',
  (sourcePoint, targetPoint) => {
    const hgap = Math.abs(targetPoint.x - sourcePoint.x);
    const path = new Path();
    path.appendSegment(Path.createSegment('M', sourcePoint.x - 4, sourcePoint.y));
    path.appendSegment(Path.createSegment('L', sourcePoint.x + 12, sourcePoint.y));
    // 水平三阶贝塞尔曲线
    path.appendSegment(
      Path.createSegment(
        'C',
        sourcePoint.x < targetPoint.x ? sourcePoint.x + hgap / 2 : sourcePoint.x - hgap / 2,
        sourcePoint.y,
        sourcePoint.x < targetPoint.x ? targetPoint.x - hgap / 2 : targetPoint.x + hgap / 2,
        targetPoint.y,
        targetPoint.x - 6,
        targetPoint.y,
      ),
    );
    path.appendSegment(Path.createSegment('L', targetPoint.x + 2, targetPoint.y));

    return path.serialize();
  },
  true,
);

Graph.registerEdge('data-processing-edge', Edge, true);

export const registerData = () => {
  registerNode();
};

// 根据节点的类型获取ports
export const getNodePorts = (type: X6NodeType, name: string) => {
  const nodeId = uniqueId();
  let ports = getLogicOutPortsByName(name)?.map((item: IOutPort) => ({
    id: item.id,
    attrs: {
      text: {
        text: item.label,
      },
    },
    group: 'out',
  }));

  if (!ports) throw new Error('未找到节点的输出端口');

  switch (type) {
    case X6NodeType.Start:
      break;
    case X6NodeType.End:
      ports = [
        {
          id: `${nodeId}-in`,
          attrs: { text: { text: '' } },
          group: 'in',
        },
      ];
      break;
    default:
      ports = [
        {
          id: `${nodeId}-in`,
          attrs: { text: { text: '' } },
          group: 'in',
        },
        ...ports,
      ];
      break;
  }
  return ports;
};

// 创建节点
export const createNode = (data: any, position: { x: number; y: number }) => {
  const node = {
    // id,
    shape: 'data-processing-node',
    x: position?.x,
    y: position?.y,
    ports: getNodePorts(data.type, data.name),
    data,
  };
  return node;
};

// 初始化画布
export const initGraph = (graphContainer: HTMLDivElement) => {
  const graph = new Graph({
    container: graphContainer,
    panning: {
      enabled: true,
      eventTypes: ['leftMouseDown', 'mouseWheel'],
    },
    mousewheel: {
      enabled: true,
      modifiers: 'ctrl',
      factor: 1.1,
      maxScale: 1.5,
      minScale: 0.5,
    },
    highlighting: {
      magnetAdsorbed: {
        name: 'stroke',
        args: {
          attrs: {
            fill: '#fff',
            stroke: '#31d0c6',
            strokeWidth: 4,
          },
        },
      },
    },
    connecting: {
      snap: true,
      allowBlank: false,
      allowLoop: false,
      highlight: true,
      allowMulti: false,
      sourceAnchor: {
        name: 'left',
        args: {
          dx: Platform.IS_SAFARI ? 4 : 8,
        },
      },
      targetAnchor: {
        name: 'right',
        args: {
          dx: Platform.IS_SAFARI ? 4 : -8,
        },
      },
      createEdge(): any {
        return graph.createEdge({
          shape: 'data-processing-edge',
          zIndex: -1,
        });
      },
      // 连接桩校验
      validateConnection({ sourceMagnet, targetMagnet }) {
        // 只能从输出链接桩创建连接
        if (!sourceMagnet || sourceMagnet.getAttribute('port-group') === 'in') {
          return false;
        }
        // 只能连接到输入链接桩
        if (!targetMagnet || targetMagnet.getAttribute('port-group') !== 'in') {
          return false;
        }

        return true;
      },
    },
  });

  return graph;
};
