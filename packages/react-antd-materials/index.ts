import { IComponentMaterial } from '@miracle/react-core/interface';
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
