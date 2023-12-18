import { initRouter } from "./navigation/router";
import { renderRoute } from "./navigation/route-rendering";
import layoutHtml from './layout.partial.html?raw';
import "./components/mount-module.component";

import "./style.css";

export const Layout = async (container) => {
    container.innerHTML = layoutHtml;

    const manifest = await (await fetch("/manifest-layout.json")).json();
    window.manifest = manifest; // TODO Store.

    initRouter(
        manifest.routes.map(route => ({
            ...route,
            render: (container) => renderRoute(route, container, manifest)
        }))
    );
};
