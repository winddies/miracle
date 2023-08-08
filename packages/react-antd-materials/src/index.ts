import { IComponentMaterial } from '@miracle/react-core';
import { ButtonMaterial } from './Button';
import { ColMaterial } from './Col';
import { RadioMaterial } from './Radio';
import { RowMaterial } from './Row';
import { SelectMaterial } from './Select';

import { ImageMaterial } from './Image';
import { InputMaterial } from './Input';
import { SwitchMaterial } from './Switch';
import { TextMaterial } from './Text';

export interface IMaterial {
  group: string;
  items: IComponentMaterial[];
}

export const materials = [
  {
    group: 'basic',
    title: '基础组件',
    items: [ButtonMaterial, RadioMaterial, SwitchMaterial, SelectMaterial, InputMaterial, ImageMaterial, TextMaterial],
  },
  {
    group: 'layout',
    title: '布局组件',
    items: [RowMaterial, ColMaterial],
  },
];

const allComponents = materials.map((item) => item.items).flat();

export function getMaterialByName(componentName: string) {
  const material = allComponents.find((item) => item.name === componentName);
  return material;
}
