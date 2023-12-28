
const router = ({ container, routes, ...overrideOpts }) => {
    const opts = {
        routeOutClass: "",
        routeOutDelay: 0,
        overrideLinkWithAttribute: "x-route",
        ...overrideOpts
    };
    const context = {
        currentPath: '',
        unrenderRoute: () => { }
    };

    const overrideLink = (domElement) => {
        domElement?.querySelectorAll(`a[${opts.overrideLinkWithAttribute}]`)?.forEach((a) => {
            a.removeAttribute(opts.overrideLinkWithAttribute);
            const overrideLinkEvent = (event) => {
                event.preventDefault();
                navigate({ to: a.getAttribute("href") });
            };
            a.addEventListener("click", (event) => overrideLinkEvent(event));
            a.addEventListener("keydown", (event) => (event.keyCode || event.which) === /* ENTER */ 13 && overrideLinkEvent(event));
        });
    };

    const animateClearContainer = async () => {
        container.className = opts.routeOutClass;
        await new Promise((resolve) => setTimeout(resolve, opts.routeOutDelay));
        context.unrenderRoute?.();
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

    const renderRoute = async (toPath, newRoute, ignoreHistory) => {
        !ignoreHistory && saveLocationInHistory(toPath);
        await clearContainer(container);
        context.currentPath = newRoute.path;
        context.unrenderRoute = await newRoute.render(container);;
    }

    const navigate = async ({ to, ignoreHistory, replace }) => {
        replace && window.history.replaceState("", "", to);
        const newRoute = findRoute(to);
        newRoute.path !== context.currentPath && await renderRoute(to, newRoute, replace || ignoreHistory);
    };

    overrideLink(document.body);
    window.onpopstate = () =>
        navigate({ to: `${window.location.pathname}${window.location.search}`, ignoreHistory: true });
    window.onpopstate();

    return { navigate };
};

export default router;
