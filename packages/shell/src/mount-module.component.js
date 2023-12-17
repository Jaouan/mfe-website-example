import { importRemote, mountRemote } from './module-loader';
import { getState } from '../../global-store/global-store';


class MountModule extends HTMLElement {
  connectedCallback() {
    const moduleId = this.getAttribute('x-id');
    mountRemote(getState().manifest, moduleId, this);
  }
}

customElements.define('mount-module', MountModule);
