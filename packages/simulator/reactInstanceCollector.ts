import { singleton } from 'tsyringe';

export interface DomNode {
  dom: HTMLElement;
  rect: DOMRect;
}

@singleton()
export default class ReactDomCollector {
  domNodeMap: Map<string, DomNode | null> = new Map();

  mount(id: string, domElement: HTMLElement | null) {
    if (domElement) {
      this.domNodeMap.set(id, {
        dom: domElement,
        rect: domElement.getBoundingClientRect(),
      });
    } else {
      this.domNodeMap.set(id, null);
    }
  }
}
