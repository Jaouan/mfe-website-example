import router from "./navigation/router";
import { renderRoute } from "./navigation/route-rendering";
import layoutHtml from './layout.partial.html?raw';
import "./components/mount-module.component";

import "./style.css";

export const Layout = async (container) => {
    container.innerHTML = layoutHtml;

    const manifest = await (await fetch(import.meta.env.VITE_LAYOUT_MANIFEST)).json();
    window.manifest = manifest; // TODO Store.

    const { navigate } = router({
        container: document.querySelector("div[x-router]"),
        routes: manifest.routes.map(route => ({
            ...route,
            render: (container) => renderRoute(route, container, manifest)
        })),
        routeOutClass: "route-out",
        routeOutDelay: 150,
        overrideLinkWithAttribute: "x-layout-route"
    });
    window.addEventListener("layout-navigate", (event) => navigate(event.detail.to));
};
