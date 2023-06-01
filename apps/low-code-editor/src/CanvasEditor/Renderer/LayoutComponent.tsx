import { MIRACLE_NODE_ID } from '@miracle/constants';
import { ISchema } from '@miracle/react-core/interface';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useRef } from 'react';
import store from '../simulatorStore';
import BaseRenderer from './BaseRenderer';

interface IProps {
  schema: ISchema;
}

export default observer(function LayoutComponent({ schema }: IProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    store.mountNode(schema.id as string, ref.current as HTMLElement);
  }, []);

  const view = useMemo(() => {
    const component = store.getComponentBySchema(schema);
    const { style, ...others } = schema.props || {};
    const { noRef, draggable } = schema.behaviorRule;
    const { designProps } = schema;
    if (!component) return null;

    const children = (
      <>
        {schema.children?.map((item: any) => (
          <BaseRenderer schema={item} key={item.id} />
        ))}
      </>
    );

    return component
      ? React.createElement(
          component,
          {
            style,
            ref,
            draggable,
            ...(noRef && { [MIRACLE_NODE_ID]: schema.id, id: schema.id }),
            ...designProps,
            ...others,
          },
          children,
        )
      : null;
  }, [schema]);

  return view;
});
