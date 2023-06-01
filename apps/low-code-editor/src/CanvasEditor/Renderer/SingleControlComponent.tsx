import { MIRACLE_NODE_ID } from '@miracle/constants';
import { ISchema } from '@miracle/react-core/interface';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useRef } from 'react';
import store from '../simulatorStore';

interface IProps {
  schema: ISchema;
}

export default observer(function SingleControlComponent({ schema }: IProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    store.mountNode(schema.id as string, ref.current as HTMLElement);
  }, []);

  const view = useMemo(() => {
    if (!schema) return null;
    const component = store.getComponentBySchema(schema);
    const { style, children, ...others } = schema.props || {};
    const { noRef, draggable } = schema.behaviorRule;
    const { designProps } = schema;
    if (!component) return null;

    return component
      ? React.createElement(
          component,
          {
            style: toJS(style),
            ref,
            draggable,
            ...(noRef && { [MIRACLE_NODE_ID]: schema.id, id: schema.id }),
            ...designProps,
            ...others,
          },
          children,
        )
      : null;
  }, []);

  return view;
});
