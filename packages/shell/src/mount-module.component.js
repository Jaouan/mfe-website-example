import { importRemote } from "./module-loader";

class MountModule extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        // TODO: Store ?
        const manifest = window.manifest;
        const moduleId = this.getAttribute('x-id');
        (await importRemote(moduleId, manifest.modules[moduleId])).mount(this);
    }
}

customElements.define('mount-module', MountModule);
