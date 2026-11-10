# Adding to the build journal

The journal uses plain HTML and works on GitHub Pages without a build step.

1. Open `journal.html` in GitHub and choose Edit.
2. Copy the complete `<article>...</article>` block and paste it above the previous entry, after the journal header. Give the new article a unique `id` (for example `debugging-my-first-circuit`) and its heading a matching unique ID; update `aria-labelledby` to that heading ID.
3. Change the entry number, title, date, reading time and paragraphs. Use `<p>...</p>` for paragraphs. For special characters use `&amp;` for &, `&lt;` for < and `&gt;` for >.
4. Optional: upload a photo to `images/`, update the image path and dimensions, and write meaningful alt text and a caption. Remove the related-project aside if it does not fit the entry.
5. Update the homepage journal card in `index.html`: title, excerpt, and link to `journal.html#your-new-id`.
6. Preview the changes and commit to publish through GitHub Pages.

## A writing prompt, not a formula

Title:

What was I building or feeling?

What happened? What did I notice?

If something broke: what did I expect, what actually happened, and how did I investigate?

What changed in my understanding?

What question or next step am I carrying forward?

Photo and caption (optional):

You can also write reflections, poems, or short essays. Every entry does not need a bug or a finished project. Keep technical claims and personal experiences true to your own experience.
