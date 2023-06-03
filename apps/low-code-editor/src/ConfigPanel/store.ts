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

  init(engine: DesigneEngine) {
    this.engine = engine;

    if (!this.engine) {
      throw new Error('engine is not initialized');
    }

    const { simulatorHost } = this.engine;
    this.engine.simulatorHost.on(EventName.SelectNode, () => {
      console.log('select node');
      this.selectedNode = simulatorHost.docTreeModel.selectedNode;
    });
  }
}

export default container.resolve(ConfigPanelStore);
