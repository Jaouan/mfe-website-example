import { initRouter } from "./navigation/router";
import { mountRemote } from "./navigation/module-loader";
import { renderRoute } from "./navigation/route-rendering";
import './components/mount-module.component';

const manifest = await (await fetch("/manifest.json")).json();
window.manifest = manifest; // TODO Store ?

await mountRemote(manifest, "layout", document.getElementById("layout"));

initRouter(
    manifest.routes.map(route => ({
        ...route,
        render: (container) => renderRoute(route, container, manifest)
    }))
);
