import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { simulatorContext } from '../util';
import * as styles from './index.module.less';

export default observer(function InsertionView() {
  const sumulator = useContext(simulatorContext);

  return <div className={styles.insertLine} style={toJS(sumulator.insertLineStyle)}></div>;
});
