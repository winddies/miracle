import { faGear, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import * as styles from './index.module.less';
import Logo from './logo.png';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];
const menuItems: MenuItem[] = [
  { icon: <FontAwesomeIcon icon={faPenToSquare} style={{ fontSize: '20px' }} />, key: 'menu1', label: '页面设计' },
  { icon: <FontAwesomeIcon icon={faGear} style={{ fontSize: '20px' }} />, key: 'menu2', label: '应用设置' },
];

export default function LeftSider() {
  const [collapsed, setCollapsed] = useState(true);
  const iconWidth = collapsed ? '60px' : '100px';

  return (
    <Sider
      className={styles['left-sider']}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className={styles['icon-container']}>
        <img src={Logo} style={{ width: iconWidth }} />
      </div>
      <Menu
        mode="inline"
        items={menuItems}
        defaultSelectedKeys={['menu1']}
        theme="dark"
        style={{ textAlign: 'center' }}
      />
    </Sider>
  );
}
