import { Form, Radio, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Block from '../icons/block.svg';
import EyeNone from '../icons/eye-none.svg';
import Flex from '../icons/flex.svg';
import Grid from '../icons/grid.svg';
import InlineBlock from '../icons/inline-block.svg';
import Inline from '../icons/inline.svg';
import * as styles from './index.module.less';

export interface IProps {
  register: any;
}

const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };

export default function LayoutBox() {
  const { register, control, getValues } = useFormContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const [showWidth, setShowWidth] = useState(false);
  const [showHeight, setShowHeight] = useState(false);
  useEffect(() => {}, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className={styles.layoutBoxContainer}>
        <div className={styles.marginBorderTop}>
          <span className={styles.inputBox}>
            <input {...register('layout.marginTop')} />
          </span>
          <span className={styles.title}>外边距</span>
        </div>
        <div className={styles.marginBorderRight}>
          <span className={styles.inputBox}>
            <input {...register('layout.marginRight')} />
          </span>
        </div>
        <div className={styles.marginBorderBottom}>
          <span className={styles.inputBox}>
            <input {...register('layout.marginBottom')} />
          </span>
        </div>
        <div className={styles.marginBorderLeft}>
          <span className={styles.inputBox}>
            <input {...register('layout.marginLeft')} />
          </span>
        </div>

        <div className={styles.paddingBorderTop}>
          <span className={styles.inputBox}>
            <input {...register('layout.paddingTop')} />
          </span>
          <span className={styles.title}>内边距</span>
        </div>
        <div className={styles.paddingBorderRight}>
          <span className={styles.inputBox}>
            <input {...register('layout.paddingRight')} />
          </span>
        </div>
        <div className={styles.paddingBorderBottom}>
          <span className={styles.inputBox}>
            <input {...register('layout.paddingBottom')} />
          </span>
        </div>
        <div className={styles.paddingBorderLeft}>
          <span className={styles.inputBox}>
            <input {...register('layout.paddingLeft')} />
          </span>
        </div>
        <div className={styles.content} ref={contentRef}>
          {showWidth ? (
            <input {...register('layout.width')} onBlur={() => setShowWidth(false)} autoFocus type="number" />
          ) : (
            <span onClick={() => setShowWidth(true)}>{getValues('layout.width') || '宽'}</span>
          )}
          &nbsp;x&nbsp;
          {showHeight ? (
            <input {...register('layout.height')} onBlur={() => setShowHeight(false)} autoFocus type="number" />
          ) : (
            <span onClick={() => setShowHeight(true)} onBlur={() => setShowHeight(false)}>
              {getValues('layout.height') || '高'}
            </span>
          )}
        </div>
      </div>
      <div className={styles.layoutDisplay}>
        <Form.Item label="展示" {...layout}>
          <Controller
            name="layout.display"
            control={control}
            render={({ field }) => (
              <Radio.Group {...field} className={styles.layoutDisplay} size="small">
                <Radio.Button value="block">
                  <Tooltip title="块级元素">
                    <img src={Block} />
                  </Tooltip>
                </Radio.Button>
                <Radio.Button value="inline">
                  <Tooltip title="行内元素">
                    <img src={Inline} />
                  </Tooltip>
                </Radio.Button>
                <Radio.Button value="inline-block">
                  <Tooltip title="行内块级元素">
                    <img src={InlineBlock} />
                  </Tooltip>
                </Radio.Button>
                <Radio.Button value="flex">
                  <Tooltip title="弹性布局">
                    <img src={Flex} />
                  </Tooltip>
                </Radio.Button>
                <Radio.Button value="grid">
                  <Tooltip title="网格布局">
                    <img src={Grid} />
                  </Tooltip>
                </Radio.Button>
                <Radio.Button value="none">
                  <Tooltip title="不显示">
                    <img src={EyeNone} />
                  </Tooltip>
                </Radio.Button>
              </Radio.Group>
            )}
          />
        </Form.Item>
      </div>
    </div>
  );
}
