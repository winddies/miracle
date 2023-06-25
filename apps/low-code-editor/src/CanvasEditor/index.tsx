import '@miracle/antd-materials/lib/style.css';
import { CanvasDisplayMode, EventName } from '@miracle/constants';
import { ICanvasDisplayModel } from '@miracle/react-core';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { engineContext } from 'src/utils/context';
import * as styles from './index.module.less';

export default observer(function FrameEditorRender() {
  const ref = useRef<HTMLIFrameElement>(null);
  const engine = useContext(engineContext);
  const [displayModel, setDisplayModel] = useState<ICanvasDisplayModel>();

  useEffect(() => {
    if (ref.current) {
      engine.simulatorHost.init(ref.current);
    }
  }, []);

  useEffect(() => {
    engine.on(EventName.CanvasSizeChange, () => {
      setDisplayModel(engine.displayModel);
    });
  }, []);

  const size = useMemo(() => {
    if (!displayModel || displayModel.mode === CanvasDisplayMode.PC) {
      return { width: '100%' };
    }

    const { width, height } = engine.displayModel.screenSize;
    return {
      width,
      height,
    };
  }, [displayModel]);

  return (
    <div className={styles.canvasBox}>
      <div {...(size && { style: size })}>
        <iframe name="SimulatorRenderer" src="/editor-render" className={styles.iframe} ref={ref} />
      </div>
    </div>
  );
});
