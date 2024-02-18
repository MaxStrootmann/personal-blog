import { env } from "~/env";
import { drive } from "~/server/google-api";
import { db } from "./db";

interface Post {
  googleId: string;
  name: string;
  createdDate: string;
  content: string;
}

const getPosts = async (): Promise<Post[]> => {
  const folderId = env.GOOGLE_DRIVE_FOLDER_ID;
  const listOfFiles = await drive.files.list({
    q: `'${folderId}' in parents and mimeType='text/markdown'`,
    fields: "files(id, name, createdTime)",
  });
  const files = listOfFiles.data.files;

  const response = await Promise.all(
    files.map(async (file: any) => {
      const postContent = await drive.files.get({
        fileId: file.id,
        alt: "media",
        fields: "data",
      });

      const posts = await db.post.create({
        data: {
          googleId: file.id,
          name: file.name,
          createdAt: file.createdTime,
          content: postContent.data,
        },
      });
      console.log("LOGGING POSTS: ", posts);
      return posts;
    }),
  );

  console.log("LOGGING RESPONSE: ", response);

  return response;
};

export default getPosts;
