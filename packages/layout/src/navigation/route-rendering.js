import { mountRemote } from "./module-loader";

const routeRenderingStrategies = {
    unknown: ({ container }) => container.innerHTML = `Unknown route type.`,
    html: ({ route, container }) => container.innerHTML = route.html,
    module: ({ route: { path, module }, container, manifest }) => mountRemote(manifest, module, container, { routePath: path }),
    modules: ({ route: { path, composition, modules }, container }) =>
        container.innerHTML = (
            `<div class="composition composition--${composition}">
                ${modules.map((module, moduleIndex) => `<mount-module class="fragment-${moduleIndex}" x-id="${module}" x-index="${moduleIndex}" x-route-path="${path}"></mount-module>`).join("")}
            </div>`
        )
};

const detectRouteRenderType = (route) =>
    Object.keys(routeRenderingStrategies).find(routeType => route[routeType]) || "unknown";

export const renderRoute = (route, container, manifest) =>
    routeRenderingStrategies[detectRouteRenderType(route)]({ route, container, manifest });
