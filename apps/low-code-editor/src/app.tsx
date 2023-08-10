import DesignEngine from '@miracle/engine';
import { Layout } from 'antd';
import { useLayoutEffect, useState } from 'react';
import ConfigPanel from './feature/ConfigPanel';
import * as styles from './index.module.less';
import Header from './layout/Header';
import SideBar from './layout/SideBar';
import FrameEditor from './page/CanvasEditor';
import { engineContext } from './utils/context';

import CanvasController from './feature/CanvasOperation';
import LeftSider from './layout/LeftSider';

const { Content } = Layout;

export default function APP() {
  const [designEngine] = useState(DesignEngine);

  useLayoutEffect(() => {
    designEngine.init();
  }, []);

  return (
    <engineContext.Provider value={designEngine}>
      <Layout>
        <LeftSider />
        <Layout>
          <Header />
          <Content className={styles.contentLayout}>
            <SideBar />
            <Content className={styles.main}>
              <CanvasController />
              <FrameEditor />
            </Content>
            <ConfigPanel />
          </Content>
        </Layout>
      </Layout>
    </engineContext.Provider>
  );
}
