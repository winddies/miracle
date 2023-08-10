import { DownOutlined } from '@ant-design/icons';
import { CanvasDisplayMode, MobileModel, mobileModelToSize } from '@miracle/constants';
import { Button, Divider, Dropdown, Space, Tooltip } from 'antd';
import classNames from 'classnames';
import { values } from 'lodash';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import Mobile from 'src/icons/mobile.svg';
import PC from 'src/icons/pc.svg';
import { engineContext } from 'src/utils/context';
import OperationBar from './OperationBar';
import * as styles from './index.module.less';
import store from './store';

const mobileItems = values(MobileModel).map((model) => {
  const size = mobileModelToSize[model];
  return {
    key: model,
    label: (
      <div className={styles.label}>
        <span>{model} </span>
        <span className={styles.size}>
          {size.width} x {size.height}
        </span>
      </div>
    ),
  };
});

export default observer(function CanvasController() {
  const engine = useContext(engineContext);

  useEffect(() => {
    store.init(engine);
  }, []);

  return (
    <div className={styles.canvasController}>
      <Space>
        <Tooltip title="PC">
          <Button
            type="text"
            onClick={() => store.setCanvasDisplayMode(CanvasDisplayMode.PC)}
            className={classNames({ [styles.btnActive]: store.displayMode === CanvasDisplayMode.PC })}
          >
            <img src={PC} alt="pc" />
          </Button>
        </Tooltip>
        <Tooltip title="H5">
          <Button
            type="text"
            onClick={() => store.setCanvasDisplayMode(CanvasDisplayMode.Mobile)}
            className={classNames({ [styles.btnActive]: store.displayMode === CanvasDisplayMode.Mobile })}
          >
            <img src={Mobile} alt="手机" />
          </Button>
        </Tooltip>
      </Space>
      <Divider type="vertical" />
      {!store.isPcPlatform && (
        <Space style={{ marginLeft: 10 }}>
          <Dropdown
            menu={{ items: mobileItems, onClick: ({ key }) => store.setMobileModel(key as MobileModel) }}
            trigger={['click']}
            overlayClassName={styles.dropdown}
          >
            <Space style={{ cursor: 'pointer' }}>
              {store.mobileModel}
              <DownOutlined className={styles.arrowDown} />
            </Space>
          </Dropdown>
        </Space>
      )}
      <OperationBar />
    </div>
  );
});
