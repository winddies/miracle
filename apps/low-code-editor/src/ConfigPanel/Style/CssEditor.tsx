import Editor from '@monaco-editor/react';
import { Controller, useFormContext } from 'react-hook-form';

export default function CssEditor() {
  const { control } = useFormContext();
  return (
    <div>
      <Controller
        name="style.customCss"
        control={control}
        render={({ field }) => (
          <Editor
            height="160px"
            defaultLanguage="css"
            defaultValue="self {\n    \n}"
            theme="vs-dark"
            onChange={field.onChange}
          />
        )}
      />
    </div>
  );
}
