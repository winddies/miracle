import { Collapse } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import FontBox from './FontBox';
import LayoutBox from './LayoutBox';

export default observer(function Style() {
  const methods = useForm();

  useEffect(() => {
    const subscription = methods.watch((value, { name, type }) => console.log(value, name, type));
    console.log(subscription);
    return subscription.unsubscribe;
  }, [methods.watch]);

  return (
    <FormProvider {...methods}>
      <Collapse defaultActiveKey={['layout', 'font', 'inlineStyle']}>
        <Collapse.Panel header="行内样式" key="inlineStyle">
          <FontBox />
        </Collapse.Panel>
        <Collapse.Panel header="布局" key="layout">
          <LayoutBox />
        </Collapse.Panel>
        <Collapse.Panel header="字体" key="font">
          <FontBox />
        </Collapse.Panel>
      </Collapse>
    </FormProvider>
  );
});
