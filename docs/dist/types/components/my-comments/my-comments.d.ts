import { ComponentInterface } from '../../stencil-public-runtime';
import { MyComment } from '../comment-interface';
export declare class MyComments implements ComponentInterface {
  /**
   * We don't need a Prop for `id`, since it is a global HTML attribute.
   * Instead, we can grab it from the HTML element with the @Element decorator.
   */
  element: any;
  /**
   * Public URL to the Supabase backend.
   */
  supabseUrl: string;
  /**
   * Public access token to the Supabased backend.
   */
  supabaseKey: string;
  /**
   * Comments assosiated with this block's `id`.
   */
  comments: MyComment[];
  /**
   * Value of the new comment text input.
   */
  newCommentValue: string;
  /**
   * Supabase client to be initialized with `supabaseUrl` and `supabaseKey`.
   * We will import this type when we install Supabase.
   */
  private supabase;
  componentWillLoad(): void | Promise<void>;
  private getComments;
  private watchComments;
  private addComment;
  private handleChange;
  private handleSubmit;
  private: any;
  private renderComment;
  render(): any;
}
