import Dragon from '@miracle/dragon';
import { IComponentMaterial } from '@miracle/react-core/interface/material';
import { makeAutoObservable } from 'mobx';
import { container, injectable } from 'tsyringe';

@injectable()
class ResourceStore {
  constructor(private dragon: Dragon) {
    makeAutoObservable(this);
  }

  init(element: HTMLElement, data: IComponentMaterial) {
    this.dragon.bindResource(element, data.schema);
  }
}

export default container.resolve(ResourceStore);
