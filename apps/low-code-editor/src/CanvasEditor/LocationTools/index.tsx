import { observer } from 'mobx-react-lite';
import ActionTools from './ActionTools';
import Detection from './Detection';
import DetectionHover from './DetectionHover';
import InsertionView from './InsertionView';
import * as styles from './index.module.less';

export default observer(function LocationTools() {
  return (
    <div className={styles.locationTools}>
      <InsertionView />
      <Detection />
      <DetectionHover />
      <ActionTools />
    </div>
  );
});
