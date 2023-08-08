import { FormSchema } from '@miracle/react-core';
import { useMemo } from 'react';
import { AntdForm, AntdFormItem } from './antd';
import { FormService } from './lib';

interface IProps {
  schema: FormSchema;
  formService: FormService;
}

export { FormService } from './lib';

export function FormControl({ schema, formService }: IProps) {
  if (!schema) return null;

  const formItems = useMemo(() => {
    return Array.isArray(schema) ? schema : schema.properties;
  }, [schema]);

  const values = useMemo(() => {
    return formItems.reduce((prev, curr) => {
      // TODO: 这里有个问题，就是有的组件 value 对应的名称不是 value，比如 Switch 的 value 对应的是 checked
      const { value } = curr['x-component-props'] || {};
      // eslint-disable-next-line no-param-reassign
      prev[curr.field] = value || curr.default || null;
      return prev;
    }, {});
  }, [schema]);

  formService.useForm({ values });

  const view = useMemo(() => {
    return formItems.map((item) => <AntdFormItem data={item} formService={formService} key={item.field} />);
  }, [schema]);

  if (!formService.methods) return null;

  return (
    <formService.FormProvider {...formService.methods}>
      {Array.isArray(schema) ? view : <AntdForm schema={schema}>{view}</AntdForm>}
    </formService.FormProvider>
  );
}
