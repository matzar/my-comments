'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-85bfe55d.js');

/*
 Stencil Client Patch Esm v2.12.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["my-comments.cjs",[[1,"my-comments",{"supabseUrl":[1,"supabse-url"],"supabaseKey":[1,"supabase-key"],"comments":[32],"newCommentValue":[32]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
