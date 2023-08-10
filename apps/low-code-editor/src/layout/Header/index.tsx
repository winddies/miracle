import { Divider, Layout } from 'antd';
import VarSetting from './Items/VarSetting';
import * as styles from './index.module.less';

export default function Header() {
  return (
    <Layout.Header className={styles.header}>
      <div>
        <VarSetting />
        <Divider type="vertical" />
      </div>
    </Layout.Header>
  );
}
