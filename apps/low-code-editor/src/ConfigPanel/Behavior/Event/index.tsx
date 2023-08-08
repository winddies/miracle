/*
 * @Author: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @Date: 2023-07-04 15:05:20
 * @LastEditors: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @LastEditTime: 2023-08-03
 * @FilePath: /miracle/apps/low-code-editor/src/ConfigPanel/Behavior/Event/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown } from 'antd';
import { keys } from 'lodash';
import { observer } from 'mobx-react-lite';
import { useMemo, useState } from 'react';
import EditIcon from 'src/icons/edit.svg';
import EventIcon from 'src/icons/event.svg';

import store from '../../store';
import VisualArranger from './VisualArranger';
import * as styles from './index.module.less';

const defaultEvents = [
  {
    label: '初始化',
    key: 'init',
  },
  {
    label: '卸载',
    key: 'unmount',
  },
  {
    label: '点击',
    key: 'onClick',
  },
];

export default observer(function Event() {
  const [newBindEvent, setNewEvent] = useState('');
  const [eventData, setEventData] = useState<Record<string, any> | null>(null);

  const handleEventUpdate = (data: Record<string, any>) => {
    store.handleEventUpdate(newBindEvent, data);
    setNewEvent('');
    setEventData(null);
  };

  const handleEventEdit = (eventKey: string) => {
    const data = store.eventCollection?.[eventKey];
    if (!data) return;
    setEventData(data);
  };

  const EventList = useMemo(() => {
    if (!store.eventCollection) return null;

    return keys(store.eventCollection).map((key: string) => (
      <>
        <div className={styles.item} key={key}>
          <img src={EventIcon} />
          {key}
          <img src={EditIcon} className={styles.action} onClick={() => handleEventEdit(key)} />
        </div>
        <Divider />
      </>
    ));
  }, [store.eventCollection]);

  const showVisualArranger = useMemo(() => !!(newBindEvent || eventData), [newBindEvent, eventData]);

  return (
    <div>
      <div className={styles.event}>
        <Dropdown menu={{ items: defaultEvents, onClick: (menu) => setNewEvent(menu.key) }}>
          <Button type="dashed" icon={<PlusOutlined />} style={{ width: 150 }}>
            添加事件
          </Button>
        </Dropdown>
      </div>
      {EventList}
      {showVisualArranger && (
        <VisualArranger
          data={eventData}
          onClose={() => {
            setNewEvent('');
            setEventData(null);
          }}
          onOk={handleEventUpdate}
        />
      )}
    </div>
  );
});
