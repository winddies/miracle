import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import * as styles from './index.module.less';
import FrameEditorStore from './store';

export default observer(function FrameEditorRender() {
  const ref = useRef<HTMLIFrameElement>(null);
  const [store] = useState(FrameEditorStore);

  useEffect(() => {
    if (ref.current) {
      store.init(ref.current);
    }
  }, []);
  return (
    <>
      <iframe name="SimulatorRenderer" src="/editor-render" className={styles.iframe} ref={ref} />
    </>
  );
});
