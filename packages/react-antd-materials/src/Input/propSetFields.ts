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
      title: '占位符',
      field: 'placeholder',
      type: 'string',
      default: '请输入',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入占位符',
      },
    },
    {
      title: '最大长度',
      field: 'maxLength',
      type: 'number',
      'x-component': 'Input',
      'x-component-props': {
        type: 'number',
        placeholder: '请输入最大长度',
      },
    },
    {
      title: '禁用',
      field: 'disabled',
      type: 'boolean',
      default: false,
      'x-component': 'Switch',
    },
    {
      title: '清除按钮',
      field: 'allowClear',
      type: 'boolean',
      default: false,
      'x-component': 'Switch',
    },
    {
      title: '类型',
      field: 'type',
      type: 'string',
      enum: ['number', 'textarea', 'default'],
      default: 'default',
      // 'x-form-item-props': {
      //   labelCol: {
      //     span: 4,
      //   },
      // },
      'x-component': 'Select',
      'x-component-props': {
        style: {
          width: 150,
        },
        options: [
          {
            label: 'default',
            value: 'default',
          },
          {
            label: 'number',
            value: 'number',
          },
        ],
      },
    },
    {
      title: '尺寸',
      field: 'size',
      type: 'string',
      enum: ['large', 'middle', 'small'],
      default: 'middle',
      'x-component': 'Select',
      'x-component-props': {
        style: {
          width: 150,
        },
        options: [
          {
            label: 'large',
            value: 'large',
          },
          {
            label: 'middle',
            value: 'middle',
          },
          {
            label: 'small',
            value: 'small',
          },
        ],
      },
    },
  ],
};
