import { Layout } from 'antd';
import FrameEditor from './CanvasEditor';
import SideBar from './layout/SideBar';

const { Header, Footer, Content } = Layout;

export default function APP() {
  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <SideBar />
        <Content>
          <FrameEditor />
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
}
