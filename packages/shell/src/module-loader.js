// See: https://github.com/originjs/vite-plugin-federation/discussions/193

import { __federation_method_setRemote, __federation_method_getRemote } from '__federation__';

export const addRemote = (scope, url, opts = {}) =>
    __federation_method_setRemote(scope, {
        url: () => Promise.resolve(url),
        format: 'esm',
        from: 'vite',
        ...opts
    });

export const getRemote = (scope, module = "./App") =>
    __federation_method_getRemote(scope, module);


export const importRemote = (scope, url, module = "./App") => {
    addRemote(scope, url);
    return getRemote(scope, module);
};
