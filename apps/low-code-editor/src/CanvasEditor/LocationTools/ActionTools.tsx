import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'antd';
import { simulatorContext } from '../util';
import * as styles from './index.module.less';

export default observer(function ActionTools() {
  const simulator = useContext(simulatorContext);

  const actions = [
    {
      key: 'delete',
      title: '删除',
      icon: faTrashCan,
      onMouseUp: (e: React.SyntheticEvent<EventTarget>) => {
        e.stopPropagation();
        simulator.remove();
      },
    },
  ];

  return (
    <div
      className={styles.actionTools}
      style={{ ...simulator.actionToolsPosition.positionStyle }}
      data-type="actionTools"
    >
      {actions.map((action) => (
        <Tooltip key={action.key} title={action.title} placement={simulator.actionToolsPosition.placement}>
          <FontAwesomeIcon
            icon={action.icon}
            onMouseUp={action.onMouseUp}
            className={styles.actionIcon}
            data-type="actionTools"
          />
        </Tooltip>
      ))}
    </div>
  );
});
