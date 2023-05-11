import Dragon from '@miracle/dragon';
import { singleton } from 'tsyringe';

export interface ISchemaFields {
  group?: string;
  name: string;
  slots?: Record<string, any>;
  attributes?: Record<string, any>;

  children?: ISchemaFields[];
}

@singleton()
export default class SchemaManager {
  schema: any = { name: 'root', slots: {}, attributes: {}, children: [] };
  constructor(private dragon: Dragon) {
    console.log('SchemaManager constructor');
  }

  setSchema(schema: ISchemaFields) {
    this.schema = schema;
  }

  addSchema = () => {
    this.schema.children = [...(this.schema.children || []), this.dragon.dragObject];
  };

  patchSchemaById() {}
}

// container.register('SchemaManager', { useClass: SchemaManager }, { lifecycle: Lifecycle.Singleton });
