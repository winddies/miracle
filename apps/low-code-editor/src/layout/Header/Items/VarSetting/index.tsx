import { SettingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import Variable from 'src/feature/Variable';
import * as styles from '../../index.module.less';

export default function VarSetting() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button type="text" onClick={() => setIsOpen(true)} icon={<SettingOutlined />} className={styles.btnTxt}>
        变量设置
      </Button>
      <Variable isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
