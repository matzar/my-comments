import { Component, Host, h, Element, ComponentInterface, Prop, State } from '@stencil/core';

@Component({
  tag: 'my-comments',
  styleUrl: 'my-comments.css',
  shadow: true,
})
export class MyComments implements ComponentInterface {
  /**
   * We don't need a Prop for `id`, since it is a global HTML attribute.
   * Instead, we can grab it from the HTML element with the @Element decorator.
   */
  @Element() element;

  /**
   * Public URL to the Supabase backend.
   */
  @Prop() supabseUrl: string;

  /**
   * Public access token to the Supabased backend.
   */
  @Prop() supabaseKey: string;

  /**
   * Comments assosiated with this block's `id`.
   */
  @State() comments: MyComments[] = [];

  /**
   * Value of the new comment text input.
   */
  @State() newCommentValue: string;

  /**
   * Supabase client to be initialized with `supabaseUrl` and `supabaseKey`.
   * We will import this type when we install Supabase.
   */
  private supabase: SupabaseClient;

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
