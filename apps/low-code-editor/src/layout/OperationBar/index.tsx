import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';
import { faArrowRotateLeft, faArrowRotateRight, faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Divider, Space, Tooltip } from 'antd';
import * as styles from './index.module.less';

export default function OperationBar() {
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
    const { icon, title, key } = props;
    return (
      <Tooltip title={title} key={key}>
        <Button icon={<FontAwesomeIcon icon={icon} />} type="text" />
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
          return <IconItem key={operation.key} icon={operation.icon} title={operation.title} />;
        })}
      </Space>
    </div>
  );
}
