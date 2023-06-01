import { Layout } from 'antd';
import * as styles from './index.module.less';
import Logo from './logo.png';

export default function Header() {
  return (
    <Layout.Header className={styles.header}>
      <img src={Logo} />
    </Layout.Header>
  );
}
