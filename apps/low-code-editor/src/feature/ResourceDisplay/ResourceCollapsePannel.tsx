import { IComponentMaterial } from '@miracle/react-core';
import { Row } from 'antd';
import ResourceItem from './ResourceItem';

export default function ResourceCollapsePannel(props: {
  title: string;
  data: IComponentMaterial[];
  defaultExpand?: boolean;
  children?: React.ReactNode;
}) {
  const { data } = props;

  return (
    <Row>
      {data.map((item: any) => (
        <ResourceItem data={item} key={item.name} />
      ))}
    </Row>
  );
}
