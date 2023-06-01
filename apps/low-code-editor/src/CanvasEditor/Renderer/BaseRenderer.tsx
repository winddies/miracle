import { ContainerType } from '@miracle/constants';
import { ISchema } from '@miracle/react-core/interface';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import LayoutComponent from './LayoutComponent';
import SingleControlComponent from './SingleControlComponent';

interface IProps {
  schema: ISchema;
}

export default observer(function Renderer({ schema }: IProps) {
  const componentView = useMemo(() => {
    if (schema.isContainer && schema.containerType === ContainerType.Layout) {
      return <LayoutComponent schema={schema} />;
    }

    return <SingleControlComponent schema={schema} />;
  }, [schema]);

  return <>{componentView}</>;
});
