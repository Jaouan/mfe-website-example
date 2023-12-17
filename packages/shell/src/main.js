import { initRouter } from "./router";
import { importRemote } from "./module-loader";
import './mount-module.component';

const routeRenderingStrategies = {
    module: async ({ route, container, remoteEntry }) => (await importRemote(route.path, remoteEntry)).mount(container),
    html: ({ route, container }) => container.innerHTML = route.html,
    unknown: ({ container }) => container.innerHTML = `Unknown route type.`
};

const detectRouteRenderType = (route) =>
    Object.keys(routeRenderingStrategies).find(routeType => route[routeType]) || "unknown";

(async () => {
    const manifest = await (await fetch("/manifest.json")).json();

    (await importRemote("layout", manifest.modules.layout)).mount(document.getElementById("layout"));

    initRouter(manifest.routes.map(route => ({
        ...route,
        mount: (container) =>
            routeRenderingStrategies[detectRouteRenderType(route)](
                {
                    route,
                    container,
                    remoteEntry: manifest.modules[route.module]
                }
            )
    })));
})();
