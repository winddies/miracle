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
      title: '跨度',
      field: 'span',
      type: 'number',
      default: '请输入',
      'x-component': 'Input',
      'x-component-props': {
        type: 'number',
        placeholder: '请输入跨度值',
        max: 24,
      },
    },
    {
      title: '偏移量',
      field: 'offset',
      type: 'number',
      'x-component': 'Input',
      'x-component-props': {
        type: 'number',
        placeholder: '请输入偏移量',
      },
    },
  ],
};
