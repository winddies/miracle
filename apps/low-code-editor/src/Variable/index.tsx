import { Drawer } from 'antd';
import Content from './Content';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Variable({ isOpen, onClose }: IProps) {
  return (
    <Drawer title="变量设置" open={isOpen} onClose={onClose}>
      <Content />
    </Drawer>
  );
}
