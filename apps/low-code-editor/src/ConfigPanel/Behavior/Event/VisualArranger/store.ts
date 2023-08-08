import { Graph } from '@antv/x6';
import { Selection } from '@antv/x6-plugin-selection';
import { IEngine } from '@miracle/engine';
import { getLogicDataByName } from '@miracle/logic-meta-materials';

import { isEmpty, keys } from 'lodash';
import { makeAutoObservable } from 'mobx';
import { container } from 'tsyringe';
import { createNode, initGraph, registerData } from './X6/index';

registerData();

class ArrangerStore {
  engine: IEngine | null = null;
  location: { x: number; y: number } | null = null;
  selectedNodeData: Record<string, any> | undefined = undefined;

  graph: Graph | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get propSchema() {
    if (!this.selectedNodeData) return null;

    const originData = getLogicDataByName(this.selectedNodeData.name);

    if (!originData) return null;

    const { propSetFields } = originData;
    const { config } = this.selectedNodeData || {};
    if (isEmpty(propSetFields)) return null;

    for (const key of keys(config)) {
      const field = (propSetFields as any).properties.find((item: any) => item.field === key);
      if (!field) break;
      const props = field['x-component-props'] || {};
      props.value = config[key];
    }

    return propSetFields as any;
  }

  transformX6DataToSchemaData(data: Array<Record<string, any>>) {
    const schemaData: { nodes: Array<Record<string, any>>; edges: Array<Record<string, any>> } = {
      nodes: [],
      edges: [],
    };

    data.forEach((item) => {
      if (item.shape === 'data-processing-node') {
        schemaData.nodes.push({
          id: item.id,
          data: item.data,
          shape: 'data-processing-node',
          x: item.position.x,
          y: item.position.y,
          ports: item.ports.items,
        });
      } else {
        schemaData.edges.push(item);
      }
    });

    return schemaData;
  }

  getLogicData() {
    const json = this.graph?.toJSON();
    if (!json) return;
    const logicSchemaData = this.transformX6DataToSchemaData(json?.cells);
    return logicSchemaData;
  }

  updateNodeData(data: Record<string, any>) {
    const { selectedNodeData } = this;
    if (!selectedNodeData) return;
    const { id } = selectedNodeData;
    const targetCell = this.graph?.getCellById(id);
    targetCell?.updateData({
      ...selectedNodeData,
      config: data,
    });
  }

  transformData(data: any) {
    const { name, title, type } = data;
    return { name, title, type };
  }

  addNode() {
    if (!this.location) return;
    const { data } = this.engine?.dragon.dragObject || {};
    if (!data) return;
    const filterData = this.transformData(data);
    const node = createNode(filterData, this.location);
    const newNode = this.graph?.addNode(node);
    if (!newNode) return;
    // 添加新节点时取消之前选中的节点，选中新添加的节点
    if (this.selectedNodeData) {
      this.graph?.unselect(this.selectedNodeData.id);
    }

    this.graph?.select(newNode.id);
    this.selectedNodeData = { id: newNode.id, ...filterData };
    this.location = null;
  }

  reset() {
    this.location = null;
    this.selectedNodeData = undefined;
  }

  init(graphContainer: HTMLDivElement, engine: IEngine, eventData: Record<string, any> | null) {
    this.engine = engine;

    this.graph = initGraph(graphContainer);

    this.graph.use(
      new Selection({
        multiple: true,
        rubberEdge: true,
        rubberNode: true,
        modifiers: 'shift',
        rubberband: true,
      }),
    );

    graphContainer?.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.location = {
        x: e.offsetX,
        y: e.offsetY,
      };
    });

    graphContainer?.addEventListener('mouseleave', () => {
      this.location = null;
    });

    graphContainer.addEventListener('drop', () => {
      this.addNode();
    });

    this.graph.on('node:click', ({ node }) => {
      const data = node.getData();
      if (!data) return;
      console.log('node:click', data);
      this.selectedNodeData = {
        ...data,
        id: node.id,
      };
    });

    if (eventData) {
      this.graph.fromJSON(eventData);
    }
  }
}

export default container.resolve(ArrangerStore);
