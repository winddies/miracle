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
  const values = useMemo(() => ({ style: store.style }), [store.selectedNode]);
  console.log('values', values);
  const methods = useForm({ values });

  const { dirtyFields } = useFormState({
    control: methods.control,
  });

  // useEffect(() => {
  //   if (store.selectedNode) {
  //     const style = store.selectedNodeSchema?.props?.style;
  //     console.log('style', style);
  //     methods.reset({ style }, { keepDefaultValues: false });
  //   }
  // }, [store.selectedNode]);

  useEffect(() => {
    const subscription = methods.watch((value, { type }) => {
      if (!type) return;
      const { style } = value;
      for (const key in style) {
        if (style[key] == null || !style[key]) {
          delete style[key];
        }
      }

      store.selectedNode?.props.setProp('style', style);
    });
    return subscription.unsubscribe;
  }, []);

  return (
    <FormProvider {...methods}>
      <Collapse defaultActiveKey={['layout', 'font', 'inlineStyle']} ghost className={styles.collpase}>
        <Collapse.Panel
          header="自定义 CSS"
          key="inlineStyle"
          extra={
            <Button
              size="small"
              type="primary"
              style={{ fontSize: 12 }}
              disabled={!dirtyFields?.style?.css}
              onClick={(e) => {
                e.stopPropagation();
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
