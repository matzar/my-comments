'use strict';

const index = require('./index-85bfe55d.js');

/*
 Stencil Client Patch Browser v2.12.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('my-comments.cjs.js', document.baseURI).href));
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["my-comments.cjs",[[1,"my-comments",{"supabseUrl":[1,"supabse-url"],"supabaseKey":[1,"supabase-key"],"comments":[32],"newCommentValue":[32]}]]]], options);
});
