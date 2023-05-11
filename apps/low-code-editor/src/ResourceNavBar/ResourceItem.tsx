import { IComponentMaterial } from '@miracle/react-core/interface';
import { useEffect, useRef, useState } from 'react';
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
    <div
      style={{
        width: '30%',
        height: 50,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ background: 'yellow', margin: '0 8px', width: '100%', height: '100%' }} ref={ref}>
        <img src={data.resourceConfig.icon} style={{ width: 30, height: 40 }} draggable={false} />
      </div>
    </div>
  );
}
