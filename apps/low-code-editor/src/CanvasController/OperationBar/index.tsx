import { Button, Space, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import PreviewJson from 'src/Preview/PreviewJson';
import { engineContext } from 'src/utils/context';
import Divider from '../Divider';
import PreviewIcon from './Play.svg';
import CodeIcon from './code.svg';
import * as styles from './index.module.less';
import RedoIcon from './redo.svg';
import UndoIcon from './undo.svg';

export default observer(function OperationBar() {
  const engine = useContext(engineContext);
  const [showJson, setShowJson] = useState(false);
  const [preJsonId, setPreJsonId] = useState('');
  const operations = [
    {
      key: 'action-group',
      items: [
        {
          key: 'undo',
          title: '撤销',
          icon: UndoIcon,
        },
        {
          key: 'redo',
          title: '恢复',
          icon: RedoIcon,
        },
      ],
    },
    {
      key: 'preview',
      title: '预览',
      icon: PreviewIcon,
      onClick: () => {
        const preId = `preId-${new Date().getTime()}`;
        const schema = engine.docTreeModel?.getSchema();
        if (schema) {
          sessionStorage.setItem(preId, JSON.stringify(schema));
          window.open(`/preview/${preId}`);
        } else {
          console.log('schema is empty');
        }
      },
    },
    {
      key: 'preview-json',
      title: '查看Json',
      icon: CodeIcon,
      onClick: () => {
        const newPreJsonId = `preJsonId-${new Date().getTime()}`;
        setPreJsonId(newPreJsonId);
        const schema = engine.docTreeModel?.getSchema();
        if (schema) {
          sessionStorage.setItem(newPreJsonId, JSON.stringify(schema));
          setShowJson(true);
        } else {
          console.log('schema is empty');
        }
      },
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
        <Button type="text" {...rest}>
          <img src={icon} alt={icon} />
        </Button>
      </Tooltip>
    );
  };

  return (
    <div className={styles['container']}>
      <Space split={<Divider />}>
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
      <PreviewJson open={showJson} onClose={() => setShowJson(false)} preId={preJsonId} />
    </div>
  );
});
