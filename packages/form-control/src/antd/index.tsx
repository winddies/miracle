import { getMaterialByName } from '@miracle/antd-materials';
import { IFormSchemaObject } from '@miracle/react-core';
import { Form } from 'antd';
import { FormService } from '../lib';

interface IProps {
  data: any;
  formService: FormService;
}

export const AntdFormItem = ({ data, formService }: IProps) => {
  const { control } = formService.useFormContext();
  const material = getMaterialByName(data['x-component']);

  if (!material) return null;

  return (
    <Form.Item label={data.title} {...data['x-form-item-props']}>
      <formService.Controller
        control={control}
        name={data.field}
        render={({ field }) => {
          return <material.component {...field} {...data['x-component-props']} />;
        }}
      />
    </Form.Item>
  );
};

interface IFormProps {
  schema: IFormSchemaObject;
  children: React.ReactNode;
}

export const AntdForm = ({ children, schema }: IFormProps) => {
  const props = schema['x-component-props'];
  return <Form {...props}>{children}</Form>;
};
