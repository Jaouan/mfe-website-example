import { initRouter } from "./router";
import { importRemote } from "./module-loader";
import './mount-module.component';

const mountModules = ({ route: { composition, modules }, container }) =>
    container.innerHTML = (
        `<div class="composition composition--${composition}">
        ${modules.map((module, moduleIndex) => `<mount-module class="fragment-${moduleIndex}" x-id="${module}"></mount-module>`).join("")}
    </div>`
    );

const routeRenderingStrategies = {
    unknown: ({ container }) => container.innerHTML = `Unknown route type.`,
    html: ({ route, container }) => container.innerHTML = route.html,
    module: ({ route, container }) => mountModules({ route: { ...route, modules: [route.module] }, container }),
    modules: mountModules
};

const detectRouteRenderType = (route) =>
    Object.keys(routeRenderingStrategies).find(routeType => route[routeType]) || "unknown";

(async () => {
    const manifest = await (await fetch("/manifest.json")).json();
    window.manifest = manifest; // TODO Store ?

    (await importRemote("layout", manifest.modules.layout)).mount(document.getElementById("layout"));

    initRouter(manifest.routes.map(route => ({
        ...route,
        mount: (container) =>
            routeRenderingStrategies[detectRouteRenderType(route)]({ route, container, manifest })
    })));
})();
