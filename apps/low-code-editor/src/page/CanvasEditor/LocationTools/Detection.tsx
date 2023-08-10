import { isEmpty } from 'lodash';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

import { simulatorContext } from '../util';
import ActionTools from './ActionTools';
import * as styles from './index.module.less';

export default observer(function Detection() {
  const simulator = useContext(simulatorContext);

  return (
    <div style={toJS(simulator.detectionStyle)} className={styles.detection}>
      {!isEmpty(toJS(simulator.detectionStyle)) && <ActionTools />}
    </div>
  );
});
