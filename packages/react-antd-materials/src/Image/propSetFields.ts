export const propSetFields = {
  type: 'form',
  'x-component': 'Form',
  'x-component-props': {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 15,
    },
  },
  properties: [
    {
      title: '图片地址',
      field: 'src',
      type: 'string',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入图片地址',
      },
    },
  ],
};
