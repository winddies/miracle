import Tabs from 'antd/lib/tabs';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { engineContext } from '../utils/context';
import Behavior from './Behavior';
import Props from './Props';
import Style from './Style';
import * as styles from './index.module.less';
import store from './store';

const tabItems = [
  {
    label: '样式',
    key: '1',
    children: <Style />,
  },
  {
    label: '属性',
    key: '2',
    children: <Props />,
  },
  {
    label: '行为',
    key: '3',
    children: <Behavior />,
  },
  // {
  //   label: '数据',
  //   key: '4',
  // },
  // {
  //   label: '动画',
  //   key: '5',
  // },
  // {
  //   label: '交互',
  //   key: '6',
  // },
];

export default observer(function ConfigPanel() {
  const engine = useContext(engineContext);

  useEffect(() => {
    store.init(engine);
  }, []);

  return <div className={styles.configPanel}>{store.selectedNode && <Tabs items={tabItems} />}</div>;
});
