import Editor from '@monaco-editor/react';
import { Controller, useFormContext } from 'react-hook-form';

export default function CssEditor() {
  const { control, getValues } = useFormContext();

  return (
    <div>
      <Controller
        name="cssEditorValue"
        control={control}
        render={({ field }) => (
          <Editor
            height="160px"
            defaultLanguage="css"
            defaultValue={getValues('customCss') || 'self {\n    \n}'}
            theme="vs-dark"
            onChange={field.onChange}
          />
        )}
      />
    </div>
  );
}
