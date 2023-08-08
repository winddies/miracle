import { getLogicDataByName } from '@miracle/logic-meta-materials';
import { IFlowNode, ILogicAction } from '@miracle/react-core';

export class Joiner {
  // 因为执行节点需要考虑多条件输出的情况，所以这里的结构为 map 以收集不同 outPort 节点
  collection = new Map<string, Joiner>();

  action: ILogicAction | null = null;

  constructor(private node: IFlowNode) {
    this.initNodeAction();
  }

  initNodeAction() {
    const logicMaterial = getLogicDataByName(this.node.data.name);
    if (!logicMaterial) throw new Error(`${this.node.data.name} 在物料里不存在`);
    if (logicMaterial.action) {
      // eslint-disable-next-line new-cap
      this.action = new logicMaterial.action();
    }
  }

  connect(joiner: Joiner, sourceOutputId: string) {
    this.collection.set(sourceOutputId, joiner);
  }

  async run(...args: any) {
    if (!this.action) return;

    await this.action?.do?.(...args);
    const { value } = this.action;
    const { targetOutportId } = this.action;
    if (this.collection.size === 0 || !targetOutportId) return value;

    const targetJoiner = this.collection.get(targetOutportId);
    targetJoiner?.run(value);
    return value;
  }
}
