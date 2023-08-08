import { getLogicResourceByName } from '@miracle/logic-meta-materials';
import { useMemo } from 'react';
import * as styles from './index.module.less';

interface IProps {
  node: any;
}

export default function DataProcessingDagNode({ node }: IProps) {
  const resource = useMemo(() => {
    return getLogicResourceByName(node.data.name);
  }, [node]);

  // const onMainMouseEnter = () => {
  //   // 获取该节点下的所有连接桩
  //   let ports = node.getPorts() || [];

  //   if (node.type === X6NodeType.Start) {
  //     ports = ports.filter((port: any) => port.group === 'out');
  //   }

  //   if (node.type === X6NodeType.End) {
  //     ports = ports.filter((port: any) => port.group === 'in');
  //   }

  //   ports.forEach((port: any) => {
  //     node.setPortProp(port.id, 'attrs/circle', {
  //       fill: '#fff',
  //       stroke: '#85A5FF',
  //     });
  //   });
  // };

  // const onMainMouseLeave = () => {
  //   // 获取该节点下的所有连接桩
  //   const ports = node.getPorts() || [];
  //   ports.forEach((port: any) => {
  //     node.setPortProp(port.id, 'attrs/circle', {
  //       fill: 'transparent',
  //       stroke: 'transparent',
  //     });
  //   });
  // };

  return (
    <div className={styles.dagNode}>
      <div className={styles.mainArea} data-name={node.data.name}>
        <img src={resource?.icon} />
        <div className={styles.nodeName}>{node.data.title}</div>
      </div>
    </div>
  );
}
