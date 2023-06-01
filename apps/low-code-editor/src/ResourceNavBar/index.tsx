import { usePredefinedMaterials } from 'src/hooks/material';
import ResourceCollapsePannel from './ResourceCollapsePannel';

export default function ResourceNavBar() {
  const materials = usePredefinedMaterials();
  return (
    <>
      {materials.map((material) => {
        return (
          <ResourceCollapsePannel key={material.group} title={material.group} defaultExpand data={material.items} />
        );
      })}
    </>
  );
}
