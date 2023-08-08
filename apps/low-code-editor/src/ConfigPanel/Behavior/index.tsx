import { Collapse } from 'antd';

import Event from './Event';

export default function Behavior() {
  return (
    <>
      <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel header="事件" key="1">
          <Event />
        </Collapse.Panel>
      </Collapse>
      <Collapse defaultActiveKey={['2']} style={{ marginTop: 24 }}>
        <Collapse.Panel header="埋点" key="2">
          埋点
        </Collapse.Panel>
      </Collapse>
    </>
  );
}
