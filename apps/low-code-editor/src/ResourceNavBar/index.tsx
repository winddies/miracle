import { Collapse } from 'antd';
import { useMemo } from 'react';
import ResourceCollapsePannel from './ResourceCollapsePannel';

interface IProps {
  resource: any;
}

export default function ResourceNavBar({ resource }: IProps) {
  const groups = useMemo(() => resource.map((data: any) => data.group), []);
  // const [activeKey, setActiveKey] = useState('');

  // const handleChange = useCallback((key: string) => {
  //   setActiveKey(key);
  // }, []);

  return (
    <Collapse ghost defaultActiveKey={groups}>
      {resource.map((data: any) => {
        return (
          <Collapse.Panel header={<div>{data.title}</div>} key={data.group}>
            <ResourceCollapsePannel key={data.group} title={data.title} defaultExpand data={data.items} />
          </Collapse.Panel>
        );
      })}
    </Collapse>
  );
}
