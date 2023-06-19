import Switch, { SwitchProps } from 'antd/es/switch';
import React from 'react';

export default React.forwardRef(function _Switch(
  props: Omit<SwitchProps, 'checked'> & { value?: string | boolean },
  ref: React.ForwardedRef<HTMLElement> | undefined,
) {
  const { value, onChange, ...others } = props;
  return <Switch ref={ref} {...others} checked={!!props.value} onChange={onChange} />;
});
