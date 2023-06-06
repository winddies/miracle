import { Button, Collapse } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm, useFormState } from 'react-hook-form';
import CssEditor from './CssEditor';
import FontBox from './FontBox';
import LayoutBox from './LayoutBox';

import store from '../store';

import * as styles from './index.module.less';

export default observer(function Style() {
  const values = useMemo(() => store.style, [store.selectedNode]);
  const methods = useForm({ values });

  const { dirtyFields } = useFormState({
    control: methods.control,
  });

  useEffect(() => {
    const subscription = methods.watch((value, { name, type }) => {
      if (!type || name === 'cssEditorValue') return;
      const data = { ...value };
      store.updateStyle(data);
    });
    return subscription.unsubscribe;
  }, []);

  return (
    <FormProvider {...methods}>
      <Collapse defaultActiveKey={['layout', 'font']} ghost className={styles.collpase}>
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
                store.updateStyle(value);
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
      </Collapse>
    </FormProvider>
  );
});
