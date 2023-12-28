import { mountRemote } from "../navigation/module-loader";

class MountModule extends HTMLElement {
    connectedCallback() {
        // TODO: Store ?
        const manifest = window.manifest;
        const moduleId = this.getAttribute('x-id');
        const preferImplicitRouting = this.getAttribute('x-index') > 0; // For this example, only first module can use path to route.
        const routePath = this.getAttribute('x-route-path');
        mountRemote(manifest, moduleId, this, { preferImplicitRouting, routePath });
    }
}

customElements.define('mount-module', MountModule);
