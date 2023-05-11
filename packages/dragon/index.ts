import { IComponentMaterial } from '@miracle/react-core/interface/material';
import { uniqueId } from 'lodash';
import { singleton } from 'tsyringe';

export interface IDragObject {
  name: string;
  group?: string;
}

@singleton()
export default class Dragon {
  dragObject: IDragObject;
  bindElements: HTMLElement[] = [];

  bind(ele: HTMLElement, data: IComponentMaterial) {
    this.bindElements.push(ele);
    const { behaviorRule } = data;
    if (behaviorRule.draggable) {
      ele.setAttribute('draggable', 'true');
      this.attachDragEvent(ele, data);
    }

    if (behaviorRule.droppable) {
      this.attachDropEvent(ele);
    }
  }

  onDragStart(e: DragEvent, data: IComponentMaterial) {
    console.log('drag start ##');

    this.dragObject = { name: data.name, group: data.group };
  }

  onDrop(e: any) {
    const id = uniqueId();
    // console.log('drop ##', this.dragE, e.target);
  }

  onDragOver(e: any) {
    e.preventDefault();
    console.log('drag over ##');
  }

  attachDropEvent(ele: HTMLElement | Document) {
    ele.addEventListener('drop', this.onDrop);
    ele.addEventListener('dragover', this.onDragOver);
    ele.addEventListener('mousemove', (e) => {
      console.log('mousemove', e);
    });
  }

  attachDragEvent(ele: HTMLElement, data: IComponentMaterial) {
    ele.addEventListener('dragstart', (e) => this.onDragStart(e, data));
    ele.addEventListener('dragover', this.onDragOver);
  }
}

// container.register('Dragon', { useClass: Dragon }, { lifecycle: Lifecycle.Singleton });
