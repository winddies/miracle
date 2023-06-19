import { ISchema } from '@miracle/react-core';
import { useEffect, useRef } from 'react';
import BaseRenderer from './BaseRenderer';
import EmptyComponent from './EmptyComponent';
import { simulatorContext } from './context';
import './index.less';

type Props =
  | { schema: ISchema; designMode: true; store: { mountNode: (id: string, dom: HTMLElement | null) => void } }
  | { schema: ISchema; designMode?: false; store: undefined };

export default function PageRenderer({ schema, designMode, store }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (designMode) {
      store.mountNode(schema.id as string, ref.current);
    }
  }, []);

  console.log('schema', schema);

  // console.log('schema', schema, styles.pageContainer);

  return (
    <div ref={ref} className="pageContainer">
      <simulatorContext.Provider value={{ store, designMode }}>
        {schema.children?.length ? (
          schema.children.map((item: any) => <BaseRenderer schema={item} key={item.id} />)
        ) : (
          <EmptyComponent />
        )}
      </simulatorContext.Provider>
    </div>
  );
}
