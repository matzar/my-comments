import { p as promiseResolve, b as bootstrapLazy } from './index-e9fa320c.js';

/*
 Stencil Client Patch Browser v2.12.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["my-comments",[[1,"my-comments",{"supabseUrl":[1,"supabse-url"],"supabaseKey":[1,"supabase-key"],"comments":[32],"newCommentValue":[32]}]]]], options);
});
