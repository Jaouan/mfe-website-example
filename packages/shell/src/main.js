import { importRemote } from "./module-loader";
import { initRouter } from "./router";

const routeTypeStrategies = {
    remoteEntry: async (route, container) => (await importRemote(route.path, route.remoteEntry)).mount(container),
    html: (route, container) => container.innerHTML = route.html,
    unknown: () => container.innerHTML = `Unhandled route type.`
};

const getRouteType = (route) =>
    Object.keys(routeTypeStrategies).find(routeType => route[routeType]) || "unknown";

(async () => {
    const mfeManifest = await (await fetch("/mfe-manifest.json")).json();

    // For this example, we take the first module in the manifest.
    initRouter(mfeManifest.routes.map(route => ({
        ...route,
        mount: (container) => routeTypeStrategies[getRouteType(route)](route, container)
    })));

    dispatchEvent(new CustomEvent("shell-refresh-route-interception"));
})();



