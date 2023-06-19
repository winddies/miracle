import { IComponentMaterial } from '@miracle/react-core';
import { Collapse, Row } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import ResourceItem from './ResourceItem';

const key = 'collapse-panel';
export default function ResourceCollapsePannel(props: {
  title: string;
  data: IComponentMaterial[];
  defaultExpand?: boolean;
  children?: React.ReactNode;
}) {
  const { title, defaultExpand, data, children, ...other } = props;
  const [expanded, setExpanded] = useState(defaultExpand);

  useEffect(() => {
    setExpanded(defaultExpand);
  }, [defaultExpand]);

  const handleChange = useCallback((activedKey: string | string[]) => {
    setExpanded(!!activedKey);
  }, []);

  return (
    <Collapse accordion activeKey={expanded ? key : ''} ghost onChange={handleChange} {...other}>
      <Collapse.Panel header={<div>{title}</div>} key={key}>
        <Row>
          {data.map((item: any) => (
            <ResourceItem data={item} key={item.name} />
          ))}
        </Row>
      </Collapse.Panel>
    </Collapse>
  );
}
