import { Col, ColorPicker, Form, Input, Radio, Row, Tooltip } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
import Center from 'src/icons/align-center.svg';
import Justify from 'src/icons/align-justify.svg';
import Left from 'src/icons/align-left.svg';
import Right from 'src/icons/align-right.svg';
import { addDebounceToField } from 'src/utils/form-enhancement';
import * as styles from './index.module.less';

const layout = { labelCol: { span: 7 }, wrapperCol: { span: 12 } };

export default function FontBox() {
  const { control } = useFormContext();

  return (
    <Form {...layout}>
      <Row>
        <Col span={12}>
          <Form.Item label="字号">
            <Controller
              name="fontSize"
              control={control}
              render={({ field }) => <Input type="number" {...addDebounceToField(field)} />}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="行高">
            <Controller
              name="lineWeight"
              control={control}
              render={({ field }) => <Input type="number" {...addDebounceToField(field)} />}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="字重">
            <Controller
              name="fontWeight"
              control={control}
              render={({ field }) => <Input type="number" {...addDebounceToField(field)} />}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="颜色">
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <ColorPicker
                  value={field.value}
                  onChange={(value) => field.onChange(value.toRgbString())}
                  format="rgb"
                />
              )}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="对齐" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} className={styles.alignFormItem}>
        <Controller
          name="textAlign"
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
    </Form>
  );
}
