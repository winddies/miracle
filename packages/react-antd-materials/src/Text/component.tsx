import { Typography } from 'antd/lib';
import React from 'react';

const _Text = (props: { [x: string]: any; type: string }, ref: React.Ref<HTMLElement> | undefined) => {
  const { type, ...others } = props;
  const { Title, Text } = Typography;

  return <Typography ref={ref}>{type === '标题' ? <Title {...others} /> : <Text {...others} />}</Typography>;
};

export default React.forwardRef(_Text);
