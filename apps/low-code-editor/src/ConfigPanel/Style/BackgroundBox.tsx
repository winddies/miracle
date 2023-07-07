import { ColorPicker, Form, Input, InputRef, Popover, Radio, RadioChangeEvent } from 'antd';
import { useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export default function BackgroundBox() {
  const { control } = useFormContext();
  const [curRadio, setCurRadio] = useState('none');
  const inputRef = useRef<InputRef>(null);

  const handleRadioChange = ({ target: { value } }: RadioChangeEvent) => {
    setCurRadio(value);
  };

  const formatCurText = (val: string) => {
    if (val?.startsWith('#') && curRadio === 'color') {
      return val;
    }
    if (val?.startsWith('url') && curRadio === 'image') {
      return `url(${val})`;
    }
    return '';
  };

  return (
    <Form>
      <Controller
        name="background"
        control={control}
        render={({ field }) => {
          return (
            <>
              <Radio.Group defaultValue="none" buttonStyle="solid" onChange={handleRadioChange} value={curRadio}>
                <Popover>
                  <Radio.Button value="none" onClick={() => field.onChange('none')}>
                    无背景
                  </Radio.Button>
                </Popover>
                <Popover>
                  <Radio.Button value="color">颜色背景</Radio.Button>
                </Popover>
                <Popover>
                  <Radio.Button value="image">图片背景</Radio.Button>
                </Popover>
              </Radio.Group>

              {['color', 'image'].includes(curRadio) && (
                <div style={{ display: 'flex' }}>
                  {curRadio === 'color' && (
                    <ColorPicker
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value.toHexString());
                      }}
                      format="hex"
                    />
                  )}
                  <Input
                    ref={inputRef}
                    onChange={({ target: { value } }) => {
                      field.onChange(curRadio === 'color' ? value : `url(${value})`);
                    }}
                    value={formatCurText(field.value)}
                    placeholder={curRadio === 'color' ? '#色值' : '输入图片URL'}
                  />
                </div>
              )}
            </>
          );
        }}
      />
    </Form>
  );
}
