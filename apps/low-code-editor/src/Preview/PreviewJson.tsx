import { Drawer } from 'antd';
import { useEffect, useState } from 'react';

interface IProps extends React.ComponentProps<typeof Drawer> {
  preId: string;
}

export default function PreviewJson(props: IProps) {
  const { preId, ...rest } = props;
  const [json, setJson] = useState('');

  useEffect(() => {
    console.log('111', preId);
    const storedJson = sessionStorage.getItem(preId) ?? '';
    if (storedJson) {
      const formattedJson = JSON.stringify(JSON.parse(storedJson), null, 2);
      setJson(formattedJson);
    } else {
      setJson('');
    }
  }, [preId]);

  return (
    <Drawer title="预览Json" {...rest} placement="right">
      <pre>{json}</pre>
    </Drawer>
  );
}
