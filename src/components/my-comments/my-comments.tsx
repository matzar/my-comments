import { Component, Host, h, Element, ComponentInterface, Prop, State } from '@stencil/core';
import { MyComment } from '../comment-interface';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

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

  componentWillLoad(): void | Promise<void> {
    this.supabase = createClient(this.supabseUrl, this.supabaseKey);
    this.getComments();
    this.watchComments();
  }

  private async getComments() {
    const { data } = await this.supabase
      // Grab data from the supabase 'comments' table.
      .from('comments')
      .select()
      // Only grab data that is assosiated with this component's id
      .eq('location_id', this.element.id)
      // Order tje data such that new comments are at the top of the list.
      .order('created_at', { ascending: false });
    // Store the response in the `comments` state variable.
    this.comments = data;
  }

  private async watchComments() {
    await this.supabase
      // Only watch updates that match our component's id
      .from(`comments:location_id=eq.${this.element.id}`)
      // When a comment is inserted into the table, update the component state.
      .on('INSERT', payload => {
        this.comments = [payload.new, ...this.comments];
      })
      .subscribe();
  }

  private async addComment() {
    const { data, error } = await this.supabase.from('comments').insert([
      {
        conntet: this.newCommentValue,
        author: 'Author Name', // Dummy value. (To be implemented when auth in added.)
        location_id: this.element.id,
        // Supabase will automatically generate `id` and `created_at`
      },
    ]);
    return data;
  }

  // TODO rename to getValue
  private handleChange(ev: Event) {
    const target = ev.currentTarget as HTMLInputElement;
    this.newCommentValue = target.value;
  }

  private handleSubmit(ev: Event) {
    // Prevent the default event behaviour to keep the page from refreshing.
    ev.preventDefault();
    this.addComment();
  }

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
        {this.comments.map(comment => this.renderComment(comment))}
      </Host>
    );
  }
}
