export type FormItemSchema = Record<string, any>;
export interface IFormSchemaObject {
  type: string;
  'x-component': string;
  'x-component-props': Record<string, any>;
  properties: FormItemSchema[];
}

export type FormSchema = IFormSchemaObject | FormItemSchema[];
