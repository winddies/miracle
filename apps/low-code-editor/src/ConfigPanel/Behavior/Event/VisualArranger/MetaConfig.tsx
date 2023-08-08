import { FormControl, FormService } from '@miracle/form-control';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import store from './store';

export default observer(function MetaConfig() {
  const formService = useMemo(() => new FormService(), [store.propSchema]);

  useEffect(() => {
    const subscription = formService.methods?.watch((value, { name }) => {
      if (!name) return;
      store.updateNodeData(value);
    });

    return subscription?.unsubscribe;
  }, [store.propSchema]);

  if (!store.propSchema || isEmpty(store.propSchema)) return null;

  return <FormControl schema={store.propSchema} formService={formService} />;
});
