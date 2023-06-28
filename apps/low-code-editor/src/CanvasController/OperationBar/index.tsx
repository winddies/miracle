import { Button, Space, Tooltip, notification } from 'antd';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import PreviewJson from 'src/Preview/PreviewJson';
import { engineContext } from 'src/utils/context';
import Divider from '../Divider';
import store from '../store';
import PreviewIcon from './Play.svg';
import CodeIcon from './code.svg';
import * as styles from './index.module.less';
import RedoIcon from './redo.svg';
import UndoIcon from './undo.svg';

export default observer(function OperationBar() {
  const engine = useContext(engineContext);
  const [showJson, setShowJson] = useState(false);
  const [preJsonId, setPreJsonId] = useState('');

  const [api] = notification.useNotification();

  useEffect(() => {
    store.init(engine);
  }, []);

  const previewPage = () => {
    const preId = `preId-${new Date().getTime()}`;
    const schema = engine.docTreeModel?.getSchema();
    if (schema) {
      sessionStorage.setItem(preId, JSON.stringify(schema));
      window.open(`/preview/${preId}`);
    } else {
      api.error({ message: 'schema is empty' });
    }
  };

  const previewJson = () => {
    const newPreJsonId = `preJsonId-${new Date().getTime()}`;
    setPreJsonId(newPreJsonId);
    const schema = engine.docTreeModel?.getSchema();
    if (schema) {
      sessionStorage.setItem(newPreJsonId, JSON.stringify(schema));
      setShowJson(true);
    } else {
      api.error({ message: 'schema is empty' });
    }
  };

  return (
    <div className={styles['container']}>
      <Space split={<Divider />}>
        <div>
          <Tooltip title="撤销">
            <Button type="text" disabled={store.undoDisabled} onClick={() => engine.docTreeModel?.undo()}>
              <img
                src={UndoIcon}
                alt="undo"
                className={classNames(store.undoDisabled ? styles['disabled'] : '', styles['icon'])}
              />
            </Button>
          </Tooltip>
          <Tooltip title="回滚">
            <Button type="text" disabled={store.redoDisabled} onClick={() => engine.docTreeModel?.redo()}>
              <img
                src={RedoIcon}
                alt="redo"
                className={classNames(store.redoDisabled ? styles['disabled'] : '', styles['icon'])}
              />
            </Button>
          </Tooltip>
        </div>
        <Tooltip title="预览">
          <Button type="text" onClick={() => previewPage()}>
            <img src={PreviewIcon} alt="preview" />
          </Button>
        </Tooltip>
        <Tooltip title="查看Json">
          <Button type="text" onClick={() => previewJson()}>
            <img src={CodeIcon} alt="code" />
          </Button>
        </Tooltip>
      </Space>
      <PreviewJson open={showJson} onClose={() => setShowJson(false)} preId={preJsonId} />
    </div>
  );
});
