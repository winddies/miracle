import { IComponentMaterial } from '@miracle/react-core/interface';
import { ButtonMaterial } from './Button';
import { SelectMaterial } from './Select';

export interface IMaterial {
  group: string;
  items: IComponentMaterial[];
}

export const materials = [
  {
    group: 'button',
    items: [ButtonMaterial],
  },
  {
    group: 'input',
    items: [SelectMaterial],
  },
];
