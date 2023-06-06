import DesigneEngine from '@miracle/engine';
import { Layout } from 'antd';
import { useLayoutEffect, useState } from 'react';
import { container } from 'tsyringe';
import FrameEditor from './CanvasEditor';
import ConfigPanel from './ConfigPanel';
import * as styles from './index.module.less';
import Header from './layout/Header';
import SideBar from './layout/SideBar';
import { engineContext } from './utils/context';

const { Content } = Layout;

export default function APP() {
  const [designEngine] = useState(container.resolve(DesigneEngine));

  useLayoutEffect(() => {
    designEngine.init();
  }, []);

  return (
    <engineContext.Provider value={designEngine}>
      <Layout>
        <Header />
        <Layout className={styles.contentLayout}>
          <SideBar />
          <Content className={styles.main}>
            <FrameEditor />
          </Content>
          <ConfigPanel />
        </Layout>
      </Layout>
    </engineContext.Provider>
  );
}
