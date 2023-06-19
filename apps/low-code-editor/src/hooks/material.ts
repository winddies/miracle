import { materials } from '@miracle/antd-materials';
import { useMemo } from 'react';

export function usePredefinedMaterials() {
  const resource = useMemo(() => materials, []);
  return resource;
}
