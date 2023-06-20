import { FormControl, FormService } from '@miracle/form-control';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import store from '../store';

export default observer(function Props() {
  const propSchema = useMemo(() => store.propsSchema, [store.selectedNode]);
  const formService = useMemo(() => new FormService(), [store.selectedNode]);

  useEffect(() => {
    const subscription = formService.methods?.watch((value, { name }) => {
      if (!name) return;
      store.updateProps(name, value[name]);
    });
    return subscription?.unsubscribe;
  }, [store.selectedNode]);

  if (!propSchema) return null;

  return <FormControl schema={propSchema} formService={formService} />;
});
