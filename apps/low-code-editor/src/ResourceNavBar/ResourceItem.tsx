import { IComponentMaterial } from '@miracle/react-core';
import Col from 'antd/es/col';
import { useContext, useEffect, useRef } from 'react';
import { engineContext } from '../utils/context';
import * as styles from './index.module.less';

interface IProps {
  data: IComponentMaterial;
}

export default function ResourceItem({ data }: IProps) {
  const ref = useRef<HTMLDivElement>(null);
  const engine = useContext(engineContext);

  useEffect(() => {
    if (ref.current) {
      engine.dragon.bindResource(ref.current, data);
    }
  }, []);

  return (
    <Col span={8}>
      <div className={styles.resourceItem}>
        <div ref={ref} className={styles.resourceIcon}>
          <img src={data.resourceConfig.icon} className={styles.resourceIcon} draggable={false} />
        </div>
        <div className={styles.resourceTitle}>{data.name}</div>
      </div>
    </Col>
  );
}
