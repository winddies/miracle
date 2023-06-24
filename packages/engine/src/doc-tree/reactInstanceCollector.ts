import { singleton } from 'tsyringe';

@singleton()
export default class ReactDomCollector {
  domNodeMap: Map<string, HTMLElement | null> = new Map();

  mount(id: string, domElement: HTMLElement | null) {
    if (domElement) {
      this.domNodeMap.set(id, domElement);
    } else {
      this.domNodeMap.set(id, null);
    }
  }
}
