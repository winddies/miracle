import { ContainerType } from '@miracle/constants';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useRef } from 'react';
import LocationTools from './LocationTools';
import Renderer from './Renderer';
import * as styles from './index.module.less';
import store from './simulatorStore';
import { simulatorContext } from './util';

export default observer(function SimulatorRender() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    store.init();
  }, []);

  // 这里的 useEffect 起到 componentDidUpdate 作用
  useEffect(() => {
    store.resolveRender?.();
  }, [store.schema]);

  const canvasView = useMemo(() => {
    const { schema } = store;
    if (schema?.isContainer && schema?.containerType === ContainerType.Page) {
      return <Renderer schema={schema} />;
    }
  }, [store.schema]);

  return (
    <div className={styles.iframeRoot} ref={ref}>
      <simulatorContext.Provider value={store}>
        {canvasView}
        <LocationTools />
      </simulatorContext.Provider>
    </div>
  );
});
