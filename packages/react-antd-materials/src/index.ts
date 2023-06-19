import { IComponentMaterial } from '@miracle/react-core';
import { ButtonMaterial } from './Button';
import { RadioMaterial } from './Radio';
import { RowMaterial } from './Row';
import { SelectMaterial } from './Select';

import { InputMaterial } from './Input';
import { SwitchMaterial } from './Switch';

import './Row/index.less';

export interface IMaterial {
  group: string;
  items: IComponentMaterial[];
}

export const materials = [
  {
    group: 'button',
    items: [ButtonMaterial, RadioMaterial, SwitchMaterial],
  },
  {
    group: 'input',
    items: [SelectMaterial, InputMaterial],
  },
  {
    group: 'layout',
    items: [RowMaterial],
  },
];

const allComponents = materials.map((item) => item.items).flat();

export function getMaterialByName(componentName: string) {
  const material = allComponents.find((item) => item.name === componentName);
  return material;
}
