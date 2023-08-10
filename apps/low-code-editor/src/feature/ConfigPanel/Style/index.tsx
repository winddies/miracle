import { Button, Collapse } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import { FormProvider, UseFormReturn, useForm, useFormState } from 'react-hook-form';
import CssEditor from './CssEditor';
import FontBox from './FontBox';
import LayoutBox from './LayoutBox';

import store from '../store';

import BackgroundBox from './BackgroundBox';

export default observer(function Style() {
  const values = useMemo(() => store.style, [store.selectedNode]);
  const methods: UseFormReturn = useForm({ values });

  const { dirtyFields } = useFormState({
    control: methods.control,
  });

  useEffect(() => {
    const subscription = methods.watch((value, { name, type }) => {
      if (!type || name === 'cssEditorValue') return;
      const data = { ...value };
      store.updateProps('style', data);
    });
    return subscription.unsubscribe;
  }, []);

  return (
    <FormProvider {...methods}>
      <Collapse defaultActiveKey={['customCss', 'layout', 'font', 'background']} ghost>
        <Collapse.Panel
          header="自定义 CSS"
          key="customCss"
          extra={
            <Button
              size="small"
              type="primary"
              style={{ fontSize: 12 }}
              disabled={!dirtyFields?.cssEditorValue}
              onClick={(e) => {
                e.stopPropagation();
                const value = { ...methods.getValues() };
                value.customCss = value.cssEditorValue;
                delete value.cssEditorValue;
                store.updateProps('style', value);
                methods.resetField('cssEditorValue');
              }}
            >
              保存
            </Button>
          }
        >
          <CssEditor />
        </Collapse.Panel>
        {/* <Divider /> */}
        <Collapse.Panel header="布局" key="layout">
          <LayoutBox />
        </Collapse.Panel>
        {/* <Divider /> */}
        <Collapse.Panel header="字体" key="font">
          <FontBox />
        </Collapse.Panel>
        <Collapse.Panel header="背景" key="background">
          <BackgroundBox />
        </Collapse.Panel>
      </Collapse>
    </FormProvider>
  );
});