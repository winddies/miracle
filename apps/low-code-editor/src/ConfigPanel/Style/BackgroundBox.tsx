import { ColorPicker, Form, Input, Popover, Radio, RadioChangeEvent } from 'antd';
import { Color } from 'antd/es/color-picker';
import { useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export default function BackgroundBox() {
  const { control } = useFormContext();
  const [curRadio, setCurRadio] = useState('');
  const [colorVal, setColorVal] = useState<Color | string>('');
  const [imgVal, setImgVal] = useState('');

  const handleRadioChange = ({ target: { value } }: RadioChangeEvent) => {
    setCurRadio(value);
  };

  const hexString = useMemo(() => (typeof colorVal === 'string' ? colorVal : colorVal.toHexString()), [colorVal]);

  return (
    <Form>
      <Controller
        name="background"
        control={control}
        render={({ field }) => (
          <>
            <Radio.Group defaultValue="none" buttonStyle="solid" onChange={handleRadioChange}>
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
            {curRadio === 'color' && (
              <div style={{ display: 'flex' }}>
                <ColorPicker
                  value={hexString}
                  onChange={(value) => {
                    setColorVal(value);
                    field.onChange(value.toHexString());
                  }}
                  format="hex"
                />
                <Input
                  onChange={({ target: { value } }) => {
                    setColorVal(value);
                    field.onChange(value);
                  }}
                  value={hexString}
                  placeholder="#色值"
                />
              </div>
            )}
            {curRadio === 'image' && (
              <Input
                onChange={({ target: { value } }) => {
                  setImgVal(value);
                  field.onChange(`url(${value})`);
                }}
                value={imgVal}
                placeholder="输入图片URL"
              />
            )}
          </>
        )}
      />
    </Form>
  );
}
