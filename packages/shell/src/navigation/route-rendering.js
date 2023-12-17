import { mountRemote } from "./module-loader";

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

export const renderRoute = (route, container, manifest) =>
    routeRenderingStrategies[detectRouteRenderType(route)]({ route, container, manifest });
