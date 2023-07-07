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
      title: '文本内容',
      field: 'children',
      type: 'string',
      default: '文本内容',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入文字',
      },
    },
  ],
};
