import { initRouter } from "./router";
import { importRemote } from "./module-loader";

const routeRenderingStrategies = {
    remoteEntry: async (route, container) => (await importRemote(route.path, route.remoteEntry)).mount(container),
    html: (route, container) => container.innerHTML = route.html,
    unknown: () => container.innerHTML = `Unknown route type.`
};

const detectRouteRenderType = (route) =>
    Object.keys(routeRenderingStrategies).find(routeType => route[routeType]) || "unknown";

(async () => {
    const mfeManifest = await (await fetch("/mfe-manifest.json")).json();

    (await importRemote("layout", mfeManifest.layout)).mount(document.getElementById("layout"));

    initRouter(mfeManifest.routes.map(route => ({
        ...route,
        mount: (container) => routeRenderingStrategies[detectRouteRenderType(route)](route, container)
    })));
})();
