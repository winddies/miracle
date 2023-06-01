import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useRef } from 'react';
import { simulatorContext } from '../util';
import BaseRenderer from './BaseRenderer';
import EmptyComponent from './EmptyComponent';
import * as styles from './index.module.less';

interface IProps {
  schema: any;
}

export default observer(function PageRenderer({ schema }: IProps) {
  const ref = useRef<HTMLDivElement>(null);
  const sumulator = useContext(simulatorContext);

  useEffect(() => {
    sumulator.mountNode(schema.id as string, ref.current);
  }, []);

  return (
    <div ref={ref} className={styles.pageContainer}>
      {schema.children.length ? (
        schema.children.map((item: any) => <BaseRenderer schema={item} key={item.id} />)
      ) : (
        <EmptyComponent />
      )}
    </div>
  );
});
