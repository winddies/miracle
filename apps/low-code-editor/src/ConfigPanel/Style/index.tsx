import { Button, Collapse, Divider } from 'antd';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { FormProvider, useForm, useFormState } from 'react-hook-form';
import { engineContext } from '../../utils/context';
import CssEditor from './CssEditor';
import FontBox from './FontBox';
import LayoutBox from './LayoutBox';

import * as styles from './index.module.less';

export default observer(function Style() {
  const methods = useForm({ mode: 'onChange' });
  const engine = useContext(engineContext);

  const { dirtyFields } = useFormState({
    control: methods.control,
  });

  useEffect(() => {
    const subscription = methods.watch((value, { name, type }) => {
      console.log('value', value, name);
      for (const key in obj) {
        if (obj[key] === null || (typeof obj[key] === 'object' && Object.keys(obj[key]).length === 0)) {
          delete obj[key];
        }
      }

      engine.docTreeModel.selectedNode.props.setProp('style', value.style);
    });
    return subscription.unsubscribe;
  }, [methods.watch]);

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
        <Divider />
        <Collapse.Panel header="布局" key="layout">
          <LayoutBox />
        </Collapse.Panel>
        <Divider />
        <Collapse.Panel header="字体" key="font">
          <FontBox />
        </Collapse.Panel>
      </Collapse>
    </FormProvider>
  );
});
