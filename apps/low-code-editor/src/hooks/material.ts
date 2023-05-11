import { materials } from '@miracle/react-antd-materials';
import { useMemo } from 'react';

export function usePredefinedMaterials() {
  const resource = useMemo(() => materials, []);
  return resource;
}
