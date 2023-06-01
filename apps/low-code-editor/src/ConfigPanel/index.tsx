import Tabs from 'antd/lib/tabs';
import { observer } from 'mobx-react-lite';
import Style from './Style';
import * as styles from './index.module.less';

const { TabPane } = Tabs;
const tabItems = [
  {
    label: '样式',
    key: '3',
    children: <Style />,
  },
  {
    label: '属性',
    key: '1',
  },
  {
    label: '事件',
    key: '2',
  },
  {
    label: '数据',
    key: '4',
  },
  {
    label: '动画',
    key: '5',
  },
  {
    label: '交互',
    key: '6',
  },
];

export default observer(function ConfigPanel() {
  return (
    <div className={styles.configPanel}>
      <Tabs items={tabItems} />
    </div>
  );
});
