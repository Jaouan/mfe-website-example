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
    // On iOS & Safari, getting the same module multiple times simultaneously may lead to unexpected errors.
    // Hack: Retry 2400 times * 25ms (1 minute).
    for (let retry = 0; retry < 2400; retry++) {
        try {
            return await __federation_method_getRemote(scope, module);
        } catch (err) {
            await new Promise((resolve) => setTimeout(resolve, 25));
        }
    }
}

export const importRemote = (scope, url, module = "./App") => {
    addRemote(scope, url);
    return getRemote(scope, module);
};

export const mountRemote = async (manifest, moduleId, container) =>
    (await importRemote(moduleId, manifest.modules[moduleId])).mount(container);

