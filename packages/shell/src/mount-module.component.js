import { importRemote } from "./module-loader";

class MountModule extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        // TODO: Store ?
        const mfeManifest = await (await fetch("/mfe-manifest.json")).json();
        const moduleId = this.getAttribute('x-id');
        (await importRemote(moduleId, mfeManifest.routes.find(route => route.path === moduleId).remoteEntry)).mount(this);
    }
}

customElements.define('mount-module', MountModule);
