import { EventName } from '@miracle/constants';
import SchemaManager from '@miracle/schema';
import { EventEmitter } from 'eventemitter3';
import { singleton } from 'tsyringe';

@singleton()
export default class SimulatorHost extends EventEmitter {
  iframeDocument: Document | null;
  iframeWindow: Window | null;

  constructor(public schemaManager: SchemaManager) {
    super();
  }

  setupEvent() {
    this.iframeDocument?.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    const manager = this.schemaManager;
    this.iframeDocument?.addEventListener('drop', (e) => {
      e.preventDefault();
      manager.addSchema();
      //   this.console.log('drop ##', this.dragon.dragE, e.target);
    });

    this.iframeDocument?.addEventListener('mousedown', (e) => {
      // this.schemaManager.
    });

    // this.iframeDocument?.addEventListener('mousemove', (e) => {

    // })
  }

  init(iframe: HTMLIFrameElement) {
    iframe.addEventListener('load', () => {
      this.iframeDocument = iframe.contentDocument;
      this.iframeWindow = iframe.contentWindow;
      this.emit(EventName.IFrameLoaded, this.iframeWindow);
      this.setupEvent();
    });
  }
}

// container.register('SimulatorHost', { useClass: SimulatorHost }, { lifecycle: Lifecycle.Singleton });
