import { initRouter } from "./router";
import { mountRemote } from "./module-loader";
import './mount-module.component';

const routeRenderingStrategies = {
    unknown: ({ container }) => container.innerHTML = `Unknown route type.`,
    html: ({ route, container }) => container.innerHTML = route.html,
    module: ({ route: { module }, container, manifest }) => mountRemote(manifest, module, container),
    modules: ({ route: { composition, modules }, container }) =>
        container.innerHTML = (
            `<div class="composition composition--${composition}">
                ${modules.map((module, moduleIndex) => `<mount-module class="fragment-${moduleIndex}" x-id="${module}"></mount-module>`).join("")}
            </div>`
        )
};

const detectRouteRenderType = (route) =>
    Object.keys(routeRenderingStrategies).find(routeType => route[routeType]) || "unknown";

(async () => {
    const manifest = await (await fetch("/manifest.json")).json();
    window.manifest = manifest; // TODO Store ?

    await mountRemote(manifest, "layout", document.getElementById("layout"));

    initRouter(manifest.routes.map(route => ({
        ...route,
        render: (container) =>
            routeRenderingStrategies[detectRouteRenderType(route)]({ route, container, manifest })
    })));
})();
