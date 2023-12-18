const overrideRelativeHref = (routerElement, routes, domElement) => {
    domElement?.querySelectorAll(`a[x-layout-route]`)?.forEach((a) => {
        a.removeAttribute("x-layout-route");
        const overrideLinkEvent = (event) => {
            event.preventDefault();
            navigate(routerElement, routes, a.getAttribute("href"));
        };
        a.addEventListener("click", (event) => overrideLinkEvent(event));
        a.addEventListener("keydown", (event) => (event.keyCode || event.which) === /* ENTER */ 13 && overrideLinkEvent(event));
    });
};

const animateClearRouterElement = async (routerElement) => {
    routerElement.className = "route-out";
    await new Promise((resolve) => setTimeout(resolve, 150)); // TODO: extract time.
    routerElement.innerHTML = "";
    routerElement.className = "";
};

const clearRouterElement = async (routerElement) =>
    routerElement.innerHTML !== "" && (await animateClearRouterElement(routerElement));

const findRoute = (routes, toPath) => {
    const sanitizedPath = toPath.replace(/^[.]+/, "");
    return (
        routes.find(({ path }) => path && sanitizedPath.startsWith(path)) ||
        routes.find(({ path }) => !path)
    );
};

const saveLocationInHistory = (toPath) => window.location.href !== toPath && window.history.pushState(false, 0, toPath);

const navigate = async (routerElement, routes, toPath, ignoreHistory) => {
    const newRoute = findRoute(routes, toPath);
    !ignoreHistory && saveLocationInHistory(toPath);
    await clearRouterElement(routerElement);
    window.dispatchEvent(new CustomEvent("layout-route-changed", { "detail": newRoute }));
    await newRoute.render(routerElement);;
};

export const handleLayoutRouteLink = () =>
    dispatchEvent(new CustomEvent("layout-handleLayoutRouteLink"));

export const initRouter = (routes) => {
    const routerElement = document.querySelector(`div[x-router]`);
    window.addEventListener("layout-navigate", (event) => navigate(routerElement, routes, event.detail.to));
    window.addEventListener("layout-handleLayoutRouteLink", () => overrideRelativeHref(routerElement, routes, document.body));
    handleLayoutRouteLink();
    window.onpopstate = () =>
        navigate(routerElement, routes, `${window.location.pathname}${window.location.search}`, true);
    window.onpopstate();
};