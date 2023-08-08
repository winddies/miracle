import { PlusOutlined } from '@ant-design/icons';
import Editor from '@monaco-editor/react';
import { Button, Col, Divider, Form, Input, Modal, Row, Select, Switch, message } from 'antd';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DeleteIcon from 'src/icons/delete.svg';
import VarIcon from 'src/icons/var.svg';
import * as styles from './index.module.less';

const options = [
  { label: 'String', value: 'String' },
  { label: 'Number', value: 'Number' },
  { label: 'Boolean', value: 'Boolean' },
  { label: 'JSON', value: 'JSON' },
];

export default function Variable() {
  const [type, setType] = useState('String');
  const { getValues, control } = useForm();
  const [visible, setVisible] = useState(false);
  const [varList, setVarList] = useState<React.ReactNode[]>([]);

  const doDelete = (name: string) => {
    const data = JSON.parse(localStorage.getItem('variable') || '[]');
    const index = data.findIndex((item: any) => item.name === name);
    data.splice(index, 1);
    localStorage.setItem('variable', JSON.stringify(data));
    refresh();
  };

  const deleteVar = (name: string) => {
    Modal.confirm({
      title: '删除变量',
      content: '确认删除该变量？',
      onOk: () => {
        doDelete(name);
      },
    });
  };

  const refresh = () => {
    const data = JSON.parse(localStorage.getItem('variable') || '[]');
    const list = data.map((item: any) => (
      <>
        <div className={styles.varItem}>
          <img src={VarIcon} />
          {item.name}
          <img src={DeleteIcon} className={styles.action} onClick={() => deleteVar(item.name)} />
        </div>
        <Divider />
      </>
    ));
    setVarList(list);
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleSubmit = () => {
    const data = getValues();
    try {
      data.value = type === 'JSON' ? JSON.parse(data.value as string) : data.value;
    } catch {
      message.error('json parse error');
      return;
    }

    const origin = JSON.parse(localStorage.getItem('variable') || '[]');
    origin.push(data);

    localStorage.setItem('variable', JSON.stringify(origin));
    setVisible(false);
    refresh();
  };

  return (
    <div className={styles.variable}>
      <Button type="dashed" icon={<PlusOutlined />} style={{ width: 150 }} onClick={() => setVisible(true)}>
        添加变量
      </Button>
      <div className={styles.varList}>{varList}</div>

      <Modal open={visible} onCancel={() => setVisible(false)} onOk={handleSubmit} title="新建变量">
        <Form.Item label="变量名" wrapperCol={{ span: 20 }} style={{ marginTop: 32 }}>
          <Controller name="name" control={control} render={({ field }) => <Input {...field} />} />
        </Form.Item>
        <Form.Item label="默认值" wrapperCol={{ span: 20 }}>
          <Row>
            <Col span={16}>
              {type === 'String' && (
                <Controller name="value" control={control} render={({ field }) => <Input {...field} />} />
              )}
              {type === 'Number' && (
                <Controller name="value" control={control} render={({ field }) => <Input type="number" {...field} />} />
              )}
              {type === 'JSON' && (
                <Controller
                  name="value"
                  control={control}
                  render={({ field }) => (
                    <Editor
                      height="100px"
                      defaultLanguage="json"
                      theme="vs-dark"
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                    />
                  )}
                />
              )}
              {type === 'Boolean' && (
                <Controller
                  name="value"
                  control={control}
                  render={({ field }) => <Switch onChange={field.onChange} checked={field.value} />}
                />
              )}
            </Col>
            <Col span={7} offset={1}>
              <Select options={options} value={type} onChange={setType} />
            </Col>
          </Row>
        </Form.Item>
      </Modal>
    </div>
  );
}
