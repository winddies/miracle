import DesigneEngine from '@miracle/engine';
import { Layout } from 'antd';
import { useLayoutEffect } from 'react';
import { container } from 'tsyringe';
import FrameEditor from './CanvasEditor';
import ConfigPanel from './ConfigPanel';
import * as styles from './index.module.less';
import Header from './layout/Header';
import SideBar from './layout/SideBar';

const { Footer, Content } = Layout;

export default function APP() {
  useLayoutEffect(() => {
    const designEngine = container.resolve(DesigneEngine);
    designEngine.init();
  }, []);

  return (
    <Layout>
      <Header />
      <Layout className={styles.contentLayout}>
        <SideBar />
        <Content style={{ padding: '0 30px' }}>
          <FrameEditor />
        </Content>
        <ConfigPanel />
      </Layout>
    </Layout>
  );
}
