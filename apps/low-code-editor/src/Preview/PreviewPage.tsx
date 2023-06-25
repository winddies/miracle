import Renderer from '@miracle/renderer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default () => {
  const params = useParams();
  const [schema, setSchema] = useState({} as any);

  useEffect(() => {
    if (params.id) {
      const schemaContent = sessionStorage.getItem(params.id);
      if (schemaContent) {
        setSchema(JSON.parse(schemaContent));
      }
    }
    return () => {};
  }, [params.id]);

  return <Renderer schema={schema} designMode={false} store={undefined} />;
};
