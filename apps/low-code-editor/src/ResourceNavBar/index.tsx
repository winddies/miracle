import { usePredefinedMaterials } from 'src/hooks/material';
import ResourceCollapsePannel from './ResourceCollapsePannel';

export default function ResourceNavBar() {
  const materials = usePredefinedMaterials();
  return (
    <div>
      {materials.map((material) => {
        return (
          <ResourceCollapsePannel key={material.group} title={material.group} defaultExpand data={material.items} />
        );
      })}
    </div>
  );
}
