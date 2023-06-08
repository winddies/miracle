import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { simulatorContext } from '../util';
import * as styles from './index.module.less';

export default observer(function Detection() {
  const simulator = useContext(simulatorContext);

  return (
    <div style={toJS(simulator.actionToolsStyle)} className={styles.actionTools}>
      <FontAwesomeIcon
        icon={faTrash}
        onMouseUp={(e) => {
          e.stopPropagation();
          simulator.remove();
        }}
        style={{ color: '#1677ff' }}
      />
    </div>
  );
});
