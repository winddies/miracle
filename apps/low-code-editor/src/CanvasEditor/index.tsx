import '@miracle/antd-materials/lib/style.css';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useRef } from 'react';
import { engineContext } from 'src/utils/context';
import * as styles from './index.module.less';

export default observer(function FrameEditorRender() {
  const ref = useRef<HTMLIFrameElement>(null);
  const engine = useContext(engineContext);

  useEffect(() => {
    if (ref.current) {
      engine.simulatorHost.init(ref.current);
    }
  }, []);

  return <iframe name="SimulatorRenderer" src="/editor-render" className={styles.iframe} ref={ref} />;
});
