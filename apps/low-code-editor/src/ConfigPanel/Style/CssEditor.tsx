import Editor from '@monaco-editor/react';
import { Controller, useFormContext } from 'react-hook-form';

export default function CssEditor() {
  const { control } = useFormContext();
  return (
    <div>
      <Controller
        name="style.css"
        control={control}
        render={({ field }) => (
          <Editor
            height="160px"
            defaultLanguage="css"
            defaultValue="// some comment"
            theme="vs-dark"
            onChange={field.onChange}
          />
        )}
      />
    </div>
  );
}
