import { Component, Host, h, Element, ComponentInterface, Prop, State } from '@stencil/core';
import { MyComment } from '../comment-interface';

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
  @State() comments: MyComment[] = [];

  /**
   * Value of the new comment text input.
   */
  @State() newCommentValue: string;

  /**
   * Supabase client to be initialized with `supabaseUrl` and `supabaseKey`.
   * We will import this type when we install Supabase.
   */
  private supabase: SupabaseClient;

  // TODO rename to getValue
  private handleChange(ev: Event) {
    const target = ev.currentTarget as HTMLInputElement;
    this.newCommentValue = target.value;
  }

  private handleSubmit(ev: Event) {}

  private;

  private renderComment(comment: MyComment) {
    return (
      <article role="comment">
        <header>
          <h1>{comment.author_id}</h1>
        </header>
        <p>{comment.content}</p>
        <footer>
          <small>
            <time dateTime={comment.created_at}>{comment.created_at}</time>
          </small>
        </footer>
      </article>
    );
  }

  render() {
    return (
      <Host>
        <h2>Comments</h2>
        <form onSubmit={(ev: Event) => this.handleSubmit(ev)}>
          <textarea rows={5} placeholder="Add a comment..." value={this.newCommentValue} onChange={(ev: Event) => this.handleChange(ev)}></textarea>
          <input type="submit" value="Submit" />
        </form>
        <h1>Comments</h1>
        {this.comments.map(comment => this.renderComment(comment))}
      </Host>
    );
  }
}
