import { getMaterialByName } from '@miracle/antd-materials';
import { ContainerType } from '@miracle/constants';
import { ILogicFlow, ISchema } from '@miracle/react-core';
import { useContext, useMemo } from 'react';

import { isEmpty } from 'lodash';
import LayoutComponent from './LayoutComponent';
import SingleControlComponent from './SingleControlComponent';
import { simulatorContext } from './context';

interface IProps {
  schema: ISchema;
}

export default function Renderer({ schema, ...others }: IProps) {
  const data = useContext(simulatorContext);

  const controller = useMemo(() => {
    const logic = schema['x-logic'];
    if (!logic || isEmpty(logic)) return null;

    return data?.logicRuntime.createController(schema.componentName, logic as ILogicFlow);
  }, [data, schema]);

  const componentView = useMemo(() => {
    const material = getMaterialByName(schema.componentName);
    if (!material) return null;

    if (material.isContainer && material.containerType === ContainerType.Layout) {
      return <LayoutComponent schema={schema} />;
    }

    return <SingleControlComponent schema={schema} {...others} {...controller?.events} />;
  }, [schema]);

  return <>{componentView}</>;
}
