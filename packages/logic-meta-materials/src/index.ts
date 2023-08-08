import { ILogicMaterial } from '@miracle/react-core';
import basicItems from './basic';
import computeItems from './compute';

export const logicMetaMaterials = [
  { group: 'basic', title: '基础', items: basicItems },
  { group: 'compute', title: '计算', items: computeItems },
];

export const getLogicResourceByName = (name: string) => {
  for (const data of logicMetaMaterials) {
    const target = data.items.find((item: ILogicMaterial) => item.name === name);
    if (target) return target.resourceConfig;
  }
};

export const getLogicDataByName = (name: string): ILogicMaterial | undefined => {
  for (const data of logicMetaMaterials) {
    const target = data.items.find((item: ILogicMaterial) => item.name === name);
    if (target) return target;
  }
};

export const getLogicOutPortsByName = (name: string) => {
  for (const data of logicMetaMaterials) {
    const target = data.items.find((item: ILogicMaterial) => item.name === name);
    if (target) return target.outPorts;
  }
};
