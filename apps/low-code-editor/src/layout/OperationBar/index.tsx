import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';
import { faArrowRotateLeft, faArrowRotateRight, faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Divider, Space, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { engineContext } from 'src/utils/context';
import * as styles from './index.module.less';

export default observer(function OperationBar() {
  const engine = useContext(engineContext);
  const navigate = useNavigate();
  const operations = [
    {
      key: 'action-group',
      items: [
        {
          key: 'undo',
          title: '撤销',
          icon: faArrowRotateLeft,
        },
        {
          key: 'redo',
          title: '恢复',
          icon: faArrowRotateRight,
        },
      ],
    },
    {
      key: 'preview',
      title: '预览',
      icon: faCirclePlay,
      onClick: () => {
        const preId = `preId-${new Date().getTime()}`;
        const schema = engine.docTreeModel?.getSchema();
        if (schema) {
          sessionStorage.setItem(preId, JSON.stringify(schema));
          navigate(`/preview/${preId}`);
        } else {
          console.log('schema is empty');
        }
      },
    },
    {
      key: 'preview-json',
      title: '查看Json',
      icon: faCode,
    },
  ];

  interface IIconItemProps {
    icon: any;
    title: string;
    key: string;
    onClick?: () => void;
  }
  const IconItem = (props: IIconItemProps) => {
    const { icon, title, key, ...rest } = props;
    return (
      <Tooltip title={title} key={key}>
        <Button icon={<FontAwesomeIcon icon={icon} />} type="text" {...rest} />
      </Tooltip>
    );
  };

  return (
    <div className={styles['container']}>
      <Space split={<Divider type="vertical" />}>
        {operations.map((operation) => {
          if (operation.items) {
            return (
              <div key={operation.key}>
                {operation.items.map((item) => (
                  <IconItem key={item.key} icon={item.icon} title={item.title} />
                ))}
              </div>
            );
          }
          return (
            <IconItem
              icon={operation.icon}
              title={operation.title}
              key={operation.key}
              onClick={() => operation.onClick?.()}
            />
          );
        })}
      </Space>
    </div>
  );
});
