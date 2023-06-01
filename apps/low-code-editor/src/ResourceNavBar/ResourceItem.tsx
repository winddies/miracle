import { IComponentMaterial } from '@miracle/react-core/interface';
import Col from 'antd/es/col';
import { useEffect, useRef, useState } from 'react';
import * as styles from './index.module.less';
import ResourceStore from './store';

interface IProps {
  data: IComponentMaterial;
}

export default function ResourceItem({ data }: IProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [store] = useState(ResourceStore);

  useEffect(() => {
    if (ref.current) {
      store.init(ref.current, data);
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
