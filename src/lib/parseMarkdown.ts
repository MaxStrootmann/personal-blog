var markdown = require("markdown").markdown;

type Post = {
  id: number;
  googleId: string;
  name: string;
  content: string;
  coverImage: string | null;
  createdAt: Date;
  updatedAt: Date;
};

function removeFirstAndLast(str: string) {
  return str.substring(0, str.length - 1);
}

export default function parsedContent(post: Post) {
  const md = markdown.parse(post.content.slice(0, 100));
  const html = markdown.toHTML(md);
  console.log("MD: ", md);
  console.log("HTML: ", html);
  return html;
}
