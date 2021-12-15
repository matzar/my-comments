import { Component, Host, h, Element, Prop, State } from '@stencil/core';
import { createClient } from '@supabase/supabase-js';
export class MyComments {
  constructor() {
    /**
     * Comments assosiated with this block's `id`.
     */
    this.comments = [];
  }
  componentWillLoad() {
    this.supabase = createClient(this.supabseUrl, this.supabaseKey);
    this.getComments();
    this.watchComments();
  }
  async getComments() {
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
  async watchComments() {
    await this.supabase
      // Only watch updates that match our component's id
      .from(`comments:location_id=eq.${this.element.id}`)
      // When a comment is inserted into the table, update the component state.
      .on('INSERT', payload => {
      this.comments = [payload.new, ...this.comments];
    })
      .subscribe();
  }
  async addComment() {
    const { data } = await this.supabase.from('comments').insert([
      {
        conntet: this.newCommentValue,
        author: 'Author Name',
        location_id: this.element.id,
        // Supabase will automatically generate `id` and `created_at`
      },
    ]);
    return data;
  }
  // TODO rename to getValue
  handleChange(ev) {
    const target = ev.currentTarget;
    this.newCommentValue = target.value;
  }
  handleSubmit(ev) {
    // Prevent the default event behaviour to keep the page from refreshing.
    ev.preventDefault();
    this.addComment();
  }
  renderComment(comment) {
    return (h("article", { role: "comment" },
      h("header", null,
        h("h1", null, comment.author_id)),
      h("p", null, comment.content),
      h("footer", null,
        h("small", null,
          h("time", { dateTime: comment.created_at }, comment.created_at)))));
  }
  render() {
    return (h(Host, null,
      h("h2", null, "Comments"),
      h("form", { onSubmit: (ev) => this.handleSubmit(ev) },
        h("textarea", { rows: 5, placeholder: "Add a comment...", value: this.newCommentValue, onChange: (ev) => this.handleChange(ev) }),
        h("input", { type: "submit", value: "Submit" })),
      this.comments.map(comment => this.renderComment(comment))));
  }
  static get is() { return "my-comments"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["my-comments.css"]
  }; }
  static get styleUrls() { return {
    "$": ["my-comments.css"]
  }; }
  static get properties() { return {
    "supabseUrl": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Public URL to the Supabase backend."
      },
      "attribute": "supabse-url",
      "reflect": false
    },
    "supabaseKey": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Public access token to the Supabased backend."
      },
      "attribute": "supabase-key",
      "reflect": false
    }
  }; }
  static get states() { return {
    "comments": {},
    "newCommentValue": {}
  }; }
  static get elementRef() { return "element"; }
}
