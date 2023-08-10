import { Modal } from 'antd';
import Tabs from 'antd/lib/tabs';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useRef } from 'react';
import { engineContext } from 'src/utils/context';
import MetaConfig from './MetaConfig';
import MetaList from './MetaList';
import * as styles from './index.module.less';
import store from './store';

interface IProps {
  data: Record<string, any> | null;
  onClose: () => void;
  onOk: (data: any) => void;
}

const items = [
  {
    label: '元件',
    key: 'arranger',
    children: <MetaList />,
  },
];

export default observer(function VisualArranger({ data, onClose, onOk }: IProps) {
  const ref = useRef<HTMLDivElement>(null);
  const engine = useContext(engineContext);

  const handleLogicUpdate = () => {
    const logicSchemaData = store.getLogicData();
    onOk(logicSchemaData);
    store.reset();
  };

  useEffect(() => {
    store.init(ref.current!, engine, data);
  }, []);

  return (
    <Modal
      open={true}
      onCancel={onClose}
      className={styles.visualArranger}
      title="可视化逻辑编排"
      onOk={() => handleLogicUpdate()}
    >
      <div className={styles.layout}>
        <Tabs items={items} defaultActiveKey="arranger" className={styles.siderTab} />
        <div id="arranger" ref={ref}></div>
        <div className={styles.rightConfig}>
          {store.selectedNodeData && (
            <>
              <div className={styles.title}>{store.selectedNodeData?.title}</div>
              <MetaConfig />
            </>
          )}
        </div>
      </div>
    </Modal>
  );
});
