import Sider from 'antd/es/layout/Sider';
import ResourceNavBar from 'src/ResourceNavBar';

export default function SideBar() {
  return (
    <Sider style={{ background: '#fff', width: '28vw', height: '80vh' }}>
      <ResourceNavBar />
    </Sider>
  );
}
