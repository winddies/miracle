import { getMaterialByName } from '@miracle/antd-materials';
import { EventName } from '@miracle/constants';
import { IEngine } from '@miracle/engine';
import type Node from '@miracle/engine/lib/doc-tree/node';
import { makeAutoObservable, reaction } from 'mobx';
import { container } from 'tsyringe';

class ConfigPanelStore {
  selectedNode: Node | null = null;
  engine: IEngine | null = null;
  eventCollection: Record<string, any> | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get selectedNodeSchema() {
    return this.selectedNode?.exportSchema();
  }

  // 这里需要把 style 设置里的字段都声明下，不然在更新 form 的时候未声明的字段 react-hook-form 会保留上次的值
  get style() {
    return {
      width: null,
      height: null,
      marginTop: null,
      marginRight: null,
      marginLeft: null,
      marginBottom: null,
      paddingTop: null,
      paddingRight: null,
      paddingBottom: null,
      paddingLeft: null,
      fontSize: null,
      fontWeight: null,
      color: null,
      display: null,
      ...this.selectedNodeSchema?.props?.style,
    };
  }

  get propsSchema() {
    const componentName = this.selectedNodeSchema?.componentName;
    return componentName ? getMaterialByName(componentName)?.propSetFields : null;
  }

  // 更新组件绑定的 props 数据
  updateProps(name: string, value: any) {
    if (value && typeof value === 'object') {
      for (const key in value) {
        if (value[key] == null || !value[key]) {
          delete value[key];
        }
      }
    }

    this.selectedNode?.props.setProp(name, value);
  }

  // 更新组件绑定的事件数据
  updateEventData() {
    const schema = this.selectedNode?.exportSchema();
    const logic = schema?.['x-logic'];
    this.eventCollection = logic && logic.events ? logic.events : null;
  }

  handleEventUpdate(name: string, value: Record<string, any>) {
    this.selectedNode?.logic.setEvent(name, value);
    this.updateEventData();
  }

  init(engine: IEngine) {
    this.engine = engine;

    if (!this.engine) {
      throw new Error('engine is not initialized');
    }

    const { simulatorHost } = this.engine;
    this.engine.simulatorHost.on(EventName.SelectNode, () => {
      this.selectedNode = simulatorHost.docTreeModel.selectedNode;
    });

    // 监听选中的节点变化，更新事件数据
    reaction(
      () => this.selectedNode,
      () => {
        if (!this.selectedNode) return;
        this.updateEventData();
      },
      { fireImmediately: true },
    );
  }
}

export default container.resolve(ConfigPanelStore);
