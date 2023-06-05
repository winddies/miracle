import { Form, Radio, Tooltip } from 'antd';
import { useRef, useState } from 'react';
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

const valueParser = (v: string) => (v ? parseInt(v, 10) : null);

export default function LayoutBox() {
  const { register, control, getValues } = useFormContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const [showWidth, setShowWidth] = useState(false);
  const [showHeight, setShowHeight] = useState(false);

  return (
    <div className={styles.layout}>
      <div className={styles.layoutBoxContainer}>
        <div className={styles.marginBorderTop}>
          <span className={styles.inputBox}>
            <input {...register('style.marginTop', { setValueAs: valueParser })} />
          </span>
          <span className={styles.title}>外边距</span>
        </div>
        <div className={styles.marginBorderRight}>
          <span className={styles.inputBox}>
            <input {...register('style.marginRight', { setValueAs: valueParser })} />
          </span>
        </div>
        <div className={styles.marginBorderBottom}>
          <span className={styles.inputBox}>
            <input {...register('style.marginBottom', { setValueAs: valueParser })} />
          </span>
        </div>
        <div className={styles.marginBorderLeft}>
          <span className={styles.inputBox}>
            <input {...register('style.marginLeft', { setValueAs: valueParser })} />
          </span>
        </div>

        <div className={styles.paddingBorderTop}>
          <span className={styles.inputBox}>
            <input {...register('style.paddingTop', { setValueAs: valueParser })} />
          </span>
          <span className={styles.title}>内边距</span>
        </div>
        <div className={styles.paddingBorderRight}>
          <span className={styles.inputBox}>
            <input {...register('style.paddingRight', { setValueAs: valueParser })} />
          </span>
        </div>
        <div className={styles.paddingBorderBottom}>
          <span className={styles.inputBox}>
            <input {...register('style.paddingBottom', { setValueAs: valueParser })} />
          </span>
        </div>
        <div className={styles.paddingBorderLeft}>
          <span className={styles.inputBox}>
            <input {...register('style.paddingLeft', { setValueAs: valueParser })} />
          </span>
        </div>
        <div className={styles.content} ref={contentRef}>
          {showWidth ? (
            <input
              {...register('style.width', { setValueAs: valueParser })}
              onBlur={() => setShowWidth(false)}
              autoFocus
            />
          ) : (
            <span onClick={() => setShowWidth(true)}>{getValues('style.width') || '宽'}</span>
          )}
          &nbsp;x&nbsp;
          {showHeight ? (
            <input
              {...register('style.height', { setValueAs: (v: string) => parseInt(v, 10) })}
              onBlur={() => setShowHeight(false)}
              autoFocus
            />
          ) : (
            <span onClick={() => setShowHeight(true)} onBlur={() => setShowHeight(false)}>
              {getValues('style.height') || '高'}
            </span>
          )}
        </div>
      </div>
      <div className={styles.layoutDisplay}>
        <Form.Item label="展示" {...layout}>
          <Controller
            name="style.display"
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
