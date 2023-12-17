import { importRemote, mountRemote } from "./module-loader";

class MountModule extends HTMLElement {
    connectedCallback() {
        // TODO: Store ?
        const manifest = window.manifest;
        const moduleId = this.getAttribute('x-id');
        mountRemote(manifest, moduleId, manifest.modules[moduleId], this);
    }
}

customElements.define('mount-module', MountModule);
