import Tabs from 'antd/es/tabs';
import ResourceNavBar from 'src/ResourceNavBar';
import * as styles from '../index.module.less';

const { TabPane } = Tabs;
export default function SideBar() {
  return (
    <div className={styles.sider}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="通用组件" key="1">
          <ResourceNavBar />
        </TabPane>
        <TabPane tab="模版" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </div>
  );
}
