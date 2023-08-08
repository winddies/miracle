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
      title: '变量',
      field: 'variable',
      type: 'number',
      'x-component': 'Select',
      'x-component-props-remote': {
        options: () => {
          const varList = JSON.parse(localStorage.getItem('variable') || '[]');
          return varList.map((item: any) => ({
            label: item.name,
            value: item.name,
          }));
        },
      },
      'x-component-props': {
        placeholder: '请选择变量',
      },
    },
  ],
};
