import { getMaterialByName } from '@miracle/antd-materials';
import { MIRACLE_NODE_ID } from '@miracle/constants';
import { ISchema } from '@miracle/react-core';
import { toJS } from 'mobx';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { simulatorContext } from './context';
import { transInlineCssToStyleObject } from './utils';

interface IProps {
  schema: ISchema;
  [key: string]: any;
}

export default function SingleControlComponent({ schema, ...otherProps }: IProps) {
  const ref = useRef<HTMLDivElement>(null);
  const data = useContext(simulatorContext);

  useEffect(() => {
    if (data?.designMode) {
      data.store?.mountNode(schema.id as string, ref.current as HTMLElement);
    }
  }, []);

  const view = useMemo(() => {
    const material = getMaterialByName(schema.componentName);
    if (!material) return null;
    const { style, children, ...others } = schema.props || {};
    const { customCss, ...otherStyles } = toJS(style) || {};
    const { noRef, draggable } = material.behaviorRule;
    const { designProps } = material;
    const { component } = material;

    return component
      ? React.createElement(
          component,
          {
            style: {
              ...otherStyles,
              ...(transInlineCssToStyleObject(customCss) || {}),
            },
            ref,
            draggable,
            ...(noRef && { [MIRACLE_NODE_ID]: schema.id, id: schema.id }),
            ...designProps,
            ...others,
            ...otherProps,
          },
          children,
        )
      : null;
  }, [schema]);

  return view;
}
