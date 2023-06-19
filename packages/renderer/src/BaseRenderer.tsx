import { getMaterialByName } from '@miracle/antd-materials';
import { ContainerType } from '@miracle/constants';
import { ISchema } from '@miracle/react-core';
import { useMemo } from 'react';
import LayoutComponent from './LayoutComponent';
import SingleControlComponent from './SingleControlComponent';

interface IProps {
  schema: ISchema;
}

export default function Renderer({ schema }: IProps) {
  const componentView = useMemo(() => {
    const material = getMaterialByName(schema.componentName);
    if (!material) return null;

    if (material.isContainer && material.containerType === ContainerType.Layout) {
      return <LayoutComponent schema={schema} />;
    }

    return <SingleControlComponent schema={schema} />;
  }, [schema]);

  return <>{componentView}</>;
}
