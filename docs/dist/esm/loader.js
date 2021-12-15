import { p as promiseResolve, b as bootstrapLazy } from './index-e9fa320c.js';

/*
 Stencil Client Patch Esm v2.12.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["my-comments",[[1,"my-comments",{"supabseUrl":[1,"supabse-url"],"supabaseKey":[1,"supabase-key"],"comments":[32],"newCommentValue":[32]}]]]], options);
  });
};

export { defineCustomElements };
