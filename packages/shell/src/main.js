import { initRouter } from "./router";
import { importRemote } from "./module-loader";
import './mount-module.component';

const routeRenderingStrategies = {
    unknown: ({ container }) => container.innerHTML = `Unknown route type.`,
    module: async ({ route, container, remoteEntry }) => (await importRemote(route.path, remoteEntry)).mount(container),
    html: ({ route, container }) => container.innerHTML = route.html,
    composition: async ({ route: { composition }, container }) =>
        container.innerHTML = (
            `<div class="fragments-container fragments-container--${composition.layout}">
                ${composition.modules.map((module, moduleIndex) => `<mount-module class="fragment-${moduleIndex}" x-id="${module}"></mount-module>`).join("")}
            </mount-module></div>`
        )
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
            routeRenderingStrategies[detectRouteRenderType(route)](
                {
                    route,
                    container,
                    remoteEntry: manifest.modules[route.module]
                }
            )
    })));
})();
