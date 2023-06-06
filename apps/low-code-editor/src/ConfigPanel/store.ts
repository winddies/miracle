import { EventName } from '@miracle/constants';
import type Node from '@miracle/docTreeModel/node';
import DesigneEngine from '@miracle/engine';
import { makeAutoObservable } from 'mobx';
import { container } from 'tsyringe';

class ConfigPanelStore {
  selectedNode: Node | null = null;
  engine: DesigneEngine | null = null;

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

  updateStyle(style: Record<string, any>) {
    for (const key in style) {
      if (style[key] == null || !style[key]) {
        delete style[key];
      }
    }
    this.selectedNode?.props.setProp('style', style);
  }

  init(engine: DesigneEngine) {
    this.engine = engine;

    if (!this.engine) {
      throw new Error('engine is not initialized');
    }

    const { simulatorHost } = this.engine;
    this.engine.simulatorHost.on(EventName.SelectNode, () => {
      this.selectedNode = simulatorHost.docTreeModel.selectedNode;
    });
  }
}

export default container.resolve(ConfigPanelStore);
