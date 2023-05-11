import Dragon from '@miracle/dragon';
import { DragonSourceType } from '@miracle/react-core/constants';
import { IComponentMaterial } from '@miracle/react-core/interface/material';
import { makeAutoObservable } from 'mobx';
import { container, injectable } from 'tsyringe';

@injectable()
class ResourceStore {
  constructor(private dragon: Dragon) {
    makeAutoObservable(this);
  }

  init(element: HTMLElement, data: IComponentMaterial) {
    element.dataset.type = DragonSourceType.Resource;
    this.dragon.bind(element, data);
  }
}

export default container.resolve(ResourceStore);
