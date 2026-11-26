# Publishing a note

Each published entry is one Markdown file here. No TypeScript changes or account on the site are needed.

1. In GitHub, open this folder on your working branch and choose **Add file > Create new file** (or **Upload files** for an existing Markdown file).
2. Name the file like `2026-11-24-my-first-meal.md`: date, lowercase words separated by hyphens, then `.md`. The date controls the order; the filename is also the permanent URL. Start with `# Your title` on the first line, then a blank line and your entry. Use _template.md as a starting point.
3. To include a photo, upload it to `public/notes/` and insert `![A short description of the photo](/notes/your-photo.jpg)` in the post.
4. Preview with `npm run dev` at `/notes`, or use your hosting provider's branch preview if enabled. Commit the file. The live site updates when the branch configured for production is deployed successfully; committing on a checkpoint branch alone does not publish to production.

Files beginning with an underscore are ignored by the blog. An ignored draft in a public repository is still public on GitHub: keep private drafts off the repository. To unlist a note, remove it or prefix its filename with an underscore and redeploy.
