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
      title: '按钮文字',
      field: 'children',
      type: 'string',
      default: '按钮',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入按钮文字',
      },
    },
    {
      title: '类型',
      field: 'type',
      type: 'string',
      enum: ['primary', 'ghost', 'dashed', 'link', 'text', 'default'],
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
            label: 'primary',
            value: 'primary',
          },
          {
            label: 'ghost',
            value: 'ghost',
          },
          {
            label: 'dashed',
            value: 'dashed',
          },
          {
            label: 'link',
            value: 'link',
          },
          {
            label: 'text',
            value: 'text',
          },
          {
            label: 'default',
            value: 'default',
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
    {
      title: '形状',
      field: 'shape',
      type: 'string',
      enum: ['circle', 'round', 'default'],
      default: 'circle',
      'x-component': 'Select',
      'x-component-props': {
        style: {
          width: 150,
        },
        options: [
          {
            label: 'circle',
            value: 'circle',
          },
          {
            label: 'round',
            value: 'round',
          },
          {
            label: 'default',
            value: 'default',
          },
        ],
      },
    },
    {
      title: '禁用',
      field: 'disabled',
      type: 'boolean',
      default: false,
      'x-component': 'Switch',
    },
  ],
};
