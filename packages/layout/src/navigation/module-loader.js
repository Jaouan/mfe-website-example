// See: https://github.com/originjs/vite-plugin-federation/discussions/193

import { __federation_method_setRemote, __federation_method_getRemote } from '__federation__';

const hackViteImportWhenUsingPublicFolder = (url) =>
    import.meta.env.PROD ? url : `${document.location.origin}${url}`;

const addRemote = (scope, url, opts = {}) =>
    __federation_method_setRemote(scope, {
        url: () => Promise.resolve(hackViteImportWhenUsingPublicFolder(url)),
        format: 'esm',
        from: 'vite',
        ...opts
    });

const getRemote = async (scope, module = "./App") => {
    return await __federation_method_getRemote(scope, module); 
}

export const importRemote = (scope, url, module = "./App") => {
    addRemote(scope, url);
    return getRemote(scope, module);
};

export const mountRemote = async (manifest, moduleId, container) =>
    (await importRemote(moduleId, manifest.modules[moduleId])).mount(container);

