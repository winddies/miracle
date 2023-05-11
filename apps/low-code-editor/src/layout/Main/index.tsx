import { Layout } from 'antd';
import CanvasEditor from '../../CanvasEditor';

const { Content } = Layout;

export default function ViewEditor() {
  return (
    <Content>
      <CanvasEditor />
    </Content>
  );
}
