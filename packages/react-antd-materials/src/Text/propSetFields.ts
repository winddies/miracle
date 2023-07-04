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
    {
      title: '类型',
      field: 'type',
      type: 'string',
      enum: ['title', 'text'],
      default: 'text',
      'x-component': 'Select',
      'x-component-props': {
        style: {
          width: 150,
        },
        options: [
          {
            label: '标题',
            value: '标题',
          },
          {
            label: '文本',
            value: '文本',
          },
        ],
      },
    },
  ],
};
