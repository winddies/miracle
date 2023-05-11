import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useRef } from 'react';
import './index.module.less';
import store from './simulatorStore';

export default observer(function SimulatorRender() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    store.init();
  }, []);

  const canvasView = useMemo(() => {
    return store.componentData?.map((item: any) => {
      const Component = item.component.component;
      return Component ? (
        <div key={item.component.name}>
          <Component />
        </div>
      ) : null;
    });
  }, [store.componentData]);

  // console.log('CanvasRenderStore.componentData', CanvasRenderStore.componentData);

  return (
    <div id="iframeRoot" ref={ref}>
      {canvasView}
      {/* {CanvasRenderStore.count} */}
      {/* {CanvasRenderStore.projectDesinger.schemaManager.count} */}
    </div>
  );
});
