import { Typography } from 'antd/lib';
import React from 'react';

type Props = { type?: string } & Record<string, any>;

const _Text = (props: Props, ref: React.Ref<HTMLElement> | undefined) => {
  const { type, ...others } = props;
  const { Title, Text } = Typography;

  return <Typography ref={ref}>{type === '标题' ? <Title {...others} /> : <Text {...others} />}</Typography>;
};

export default React.forwardRef(_Text);
