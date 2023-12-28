import { getMemoryState } from "global-store";
import { mountRemote } from "../navigation/module-loader";

class MountModule extends HTMLElement {
    connectedCallback() {
        const manifest = getMemoryState().layoutManifest;
        const moduleId = this.getAttribute('x-id');
        const preferImplicitRouting = this.getAttribute('x-index') > 0; // For this example, only first module can use path to route.
        const routePath = this.getAttribute('x-route-path');
        const unmount = mountRemote(manifest, moduleId, this, { preferImplicitRouting, routePath });

        this.unmountCallback = () => typeof unmount === 'function' && unmount();
        this.addEventListener("module-unmount", this.unmountCallback);
    }
    disconnectedCallback() {
        this.removeEventListener("module-unmount", this.unmountCallback);
    }
}

customElements.define('mount-module', MountModule);
