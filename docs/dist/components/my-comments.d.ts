import type { Components, JSX } from "../types/components";

interface MyComments extends Components.MyComments, HTMLElement {}
export const MyComments: {
  prototype: MyComments;
  new (): MyComments;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
