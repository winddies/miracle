import { debounce } from 'lodash';
import { ControllerRenderProps, FieldValues, UseFormRegister } from 'react-hook-form';

export const handleRegister = (originRegister: UseFormRegister<any>, name: string, config: any) => {
  const field = originRegister(name, config);
  return {
    ...field,
    onChange: debounce(field.onChange, 500),
  };
};

export const addDebounceToField = (field: ControllerRenderProps<FieldValues, any>) => {
  // eslint-disable-next-line no-param-reassign
  field.onChange = debounce(field.onChange, 500);
  return field;
};
