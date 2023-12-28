import router from "./navigation/router";
import { renderRoute } from "./navigation/route-rendering";
import layoutHtml from './layout.partial.html?raw';
import { setMemoryState } from "global-store";
import "./components/mount-module.component";

import "./style.css";

export const Layout = async (container) => {
    container.innerHTML = layoutHtml;

    const layoutManifest = await (await fetch(import.meta.env.VITE_LAYOUT_MANIFEST)).json();
    setMemoryState({ layoutManifest })

    const { navigate } = router({
        container: document.querySelector("div[x-router]"),
        routes: layoutManifest.routes.map(route => ({
            ...route,
            render: (container) => renderRoute(route, container, layoutManifest)
        })),
        routeOutClass: "route-out",
        routeOutDelay: 150,
        overrideLinkWithAttribute: "x-layout-route"
    });
    window.addEventListener("layout-navigate", (event) => navigate(event.detail.to));
};
