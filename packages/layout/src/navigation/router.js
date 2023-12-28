
const router = ({ container, routes, ...overrideOpts }) => {
    const opts = {
        routeOutClass: "",
        routeOutDelay: 0,
        overrideLinkWithAttribute: "x-route",
        ...overrideOpts
    };
    const context = {
        currentPath: ''
    };

    const overrideLink = (domElement) => {
        domElement?.querySelectorAll(`a[${opts.overrideLinkWithAttribute}]`)?.forEach((a) => {
            a.removeAttribute(opts.overrideLinkWithAttribute);
            const overrideLinkEvent = (event) => {
                event.preventDefault();
                navigateToPath(a.getAttribute("href"));
            };
            a.addEventListener("click", (event) => overrideLinkEvent(event));
            a.addEventListener("keydown", (event) => (event.keyCode || event.which) === /* ENTER */ 13 && overrideLinkEvent(event));
        });
    };

    const animateClearContainer = async () => {
        container.className = opts.routeOutClass;
        await new Promise((resolve) => setTimeout(resolve, opts.routeOutDelay));
        container.innerHTML = "";
        container.className = "";
    };

    const clearContainer = async () =>
        container.innerHTML !== "" && (await animateClearContainer(container));

    const findRoute = (toPath) => {
        const sanitizedPath = toPath.replace(/^[.]+/, "");
        return (
            routes.find(({ path }) => path && sanitizedPath.startsWith(path)) ||
            routes.find(({ path }) => !path)
        );
    };

    const saveLocationInHistory = (toPath) => window.location.href !== toPath && window.history.pushState(false, 0, toPath);

    const navigateToPath = async (toPath, ignoreHistory) => {
        const newRoute = findRoute(toPath);
        newRoute.path !== context.currentPath && await navigateToRoute(toPath, newRoute, ignoreHistory);
    };

    const navigateToRoute = async (toPath, newRoute, ignoreHistory) => {
        !ignoreHistory && saveLocationInHistory(toPath);
        await clearContainer(container);
        context.currentPath = newRoute.path;
        context.unmountRoute = await newRoute.render(container);;
    }

    overrideLink(document.body);
    window.onpopstate = () =>
        navigateToPath(`${window.location.pathname}${window.location.search}`, true);
    window.onpopstate();

    return { navigate: navigateToPath };
};

export default router;
