import { getMaterialByName } from '@miracle/antd-materials';
import { IFormSchemaObject } from '@miracle/react-core';
import { Form } from 'antd';
import { keys } from 'lodash';
import { useEffect, useState } from 'react';
import { FormService } from '../lib';

interface IProps {
  data: any;
  formService: FormService;
}

export const AntdFormItem = ({ data, formService }: IProps) => {
  const { control } = formService.useFormContext();
  const material = getMaterialByName(data['x-component']);
  const [newProps, setNewProps] = useState({});

  if (!material) return null;

  useEffect(() => {
    const { 'x-component-props-remote': remoteProps, 'x-component-props': props } = data;

    const remotes = remoteProps
      ? keys(remoteProps).map(async (key) => {
          props[key] = await remoteProps[key]();
        })
      : [];

    Promise.all(remotes).then(() => {
      setNewProps(props);
    });
  }, [data]);

  return (
    <Form.Item label={data.title} {...data['x-form-item-props']}>
      <formService.Controller
        control={control}
        name={data.field}
        render={({ field }) => {
          return (
            <material.component
              {...newProps}
              {...field}

              // onChange={(value: any) => {
              //   field.onChange(value);
              //   setTimeout(() => {
              //     console.log('value', field.value);
              //   }, 2000);
              // }}
            />
          );
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
