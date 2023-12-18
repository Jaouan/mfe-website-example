import { initRouter } from "./navigation/router";
import { renderRoute } from "./navigation/route-rendering";
import "./components/mount-module.component";

import "./style.css";

export const Layout = async (container) => {
    container.innerHTML = `   
    <nav>
        <a href="/" x-shell-route>home</a>
        <a href="/mfe-1" x-shell-route>mfe-1</a>
        <a href="/composition-default" x-shell-route>composition-default</a>
        <a href="/composition-side" x-shell-route>composition-side-by-side</a>
        <a href="/composition-4" x-shell-route>composition-4</a>
    </nav>
    <hr/>
    <div x-router></div>
`;

    const manifest = await (await fetch("/manifest-layout.json")).json();
    window.manifest = manifest; // TODO Store.
    
    initRouter(
        manifest.routes.map(route => ({
            ...route,
            render: (container) => renderRoute(route, container, manifest)
        }))
    );
};
