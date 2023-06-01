import { Col, ColorPicker, Form, Input, Radio, Row, Tooltip } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
import Center from '../icons/align-center.svg';
import Justify from '../icons/align-justify.svg';
import Left from '../icons/align-left.svg';
import Right from '../icons/align-right.svg';
import * as styles from './index.module.less';

const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };

export default function FontBox() {
  const { register, control, getValues } = useFormContext();

  return (
    <Form {...layout}>
      <Row>
        <Col span={12}>
          <Form.Item label="字号">
            <Controller name="font.size" control={control} render={() => <Input type="number" />} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="行高">
            <Controller name="font.lineWeight" control={control} render={() => <Input type="number" />} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="字重">
            <Controller name="font.fontWeight" control={control} render={() => <Input type="number" />} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="颜色">
            <Controller name="font.color" control={control} render={() => <ColorPicker />} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="对齐">
            <Controller
              name="font.color"
              control={control}
              render={() => (
                <Radio.Group className={styles.fontAlign}>
                  <Radio.Button value="left">
                    <Tooltip title="左对齐">
                      <img src={Left} />
                    </Tooltip>
                  </Radio.Button>
                  <Radio.Button value="right">
                    <Tooltip title="右对齐">
                      <img src={Right} />
                    </Tooltip>
                  </Radio.Button>
                  <Radio.Button value="center">
                    <Tooltip title="居中">
                      <img src={Center} />
                    </Tooltip>
                  </Radio.Button>
                  <Radio.Button value="justify">
                    <Tooltip title="两端对齐">
                      <img src={Justify} />
                    </Tooltip>
                  </Radio.Button>
                </Radio.Group>
              )}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
