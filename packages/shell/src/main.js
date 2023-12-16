import { importRemote } from "./module-loader";
import router from "./router";


const mountTypeStrategies = {
    remoteEntry: async (route, container) => (await importRemote(route.path, route.remoteEntry)).mount(container),
    html: (route, container) => container.innerHTML = route.html
};

(async () => {
    const mfeManifest = await (await fetch("/mfe-manifest.json")).json();

    // For this example, we take the first module in the manifest.
    router.initRouter(mfeManifest.routes.map(route => ({
        ...route,
        mount: async (container) => {
            // TODO rework
            route.html && mountTypeStrategies.html(route, container);
            route.remoteEntry && mountTypeStrategies.remoteEntry(route, container);
        }
    })));

    dispatchEvent(new CustomEvent("shell-refresh-route-interception"));
})();



