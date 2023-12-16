class Router {

    containerElement = document.body.appendChild(document.createElement("div"));

    initRouter(routes) {
        const routerElement = document.querySelector(`div[x-router]`);
        window.addEventListener("shell-refresh-route-interception", () => this._overrideRelativeHref(routerElement, routes, document.body));
        window.onpopstate = () => this._navigate(routerElement, routes, `${window.location.pathname}${window.location.search}`);
        window.onpopstate();
    }

    _overrideRelativeHref(routerElement, routes, routeElement) {
        routeElement?.querySelectorAll(`a[x-shell-route]`)?.forEach((a) => {
            a.removeAttribute("x-shell-route");
            const overrideLinkEvent = (event) => {
                event.preventDefault();
                this._navigate(routerElement, routes, a.getAttribute("href"));
            };
            a.addEventListener("click", (event) => overrideLinkEvent(event));
            a.addEventListener("keydown", (event) => (event.keyCode || event.which) === /* ENTER */ 13 && overrideLinkEvent(event));
        });
    };

    async _animateClearRouterElement(routerElement) {
        routerElement.className = "route-out";
        await new Promise((resolve) => setTimeout(resolve, 300));
        routerElement.innerHTML = "";
        routerElement.className = "";
    };

    async _clearRouterElement(routerElement) {
        routerElement.innerHTML !== "" && (await this._animateClearRouterElement(routerElement));
    }

    _findRoute(routes, toPath) {
        const sanitizedPath = toPath.replace(/^[.]+/, "");
        return (
            routes.find(({ path }) => path && sanitizedPath.startsWith(path)) ||
            routes.find(({ path }) => !path)
        );
    };

    async _bootstrapModule(routes, routerElement, newRoute) {
        newRoute.fullscreen ? routerElement.setAttribute("x-fullscreen", true) : routerElement.removeAttribute("x-fullscreen");
        await newRoute.mount(routerElement);
        this._overrideRelativeHref(routerElement, routes, routerElement);
    };

    _saveLocationInHistory(toPath) {
        window.location.href !== toPath && window.history.pushState(false, 0, toPath);
    }

    async _navigate(routerElement, routes, toPath, ignoreHistory) {
        const newRoute = this._findRoute(routes, toPath);
        !ignoreHistory && this._saveLocationInHistory(toPath);
        await this._clearRouterElement(routerElement);
        window.dispatchEvent(new CustomEvent("shell-route-changed", { "detail": newRoute }));
        await this._bootstrapModule(routes, routerElement, newRoute);
    }
}

const router = new Router();
export default router;
