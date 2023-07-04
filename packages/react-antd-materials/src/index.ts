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
    items: [ButtonMaterial, RadioMaterial, SwitchMaterial, SelectMaterial, InputMaterial, ImageMaterial, TextMaterial],
  },
  {
    group: 'layout',
    items: [RowMaterial, ColMaterial],
  },
];

const allComponents = materials.map((item) => item.items).flat();

export function getMaterialByName(componentName: string) {
  const material = allComponents.find((item) => item.name === componentName);
  return material;
}
