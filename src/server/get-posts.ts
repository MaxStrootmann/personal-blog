import { env } from "~/env";
import { drive } from "~/server/google-api";
import { db } from "./db"; // Add missing import statement for db module

type Post = {
  googleId: string;
  name: string;
  createdDate: string;
  content: string;
};

// Function to retrieve all posts from Google Drive
export default async function getPosts(): Promise<Post[]> {
  const folderId = env.GOOGLE_DRIVE_FOLDER_ID;

  // Retrieve list of files from the specified folder in Google Drive
  const listOfFiles = await drive.files.list({
    q: `'${folderId}' in parents and mimeType='text/markdown'`,
    fields: "files(id, name, createdTime)",
  });
  const files = listOfFiles.data.files;

  // Process each file asynchronously
  const response = await Promise.all(
    files.map(async (file: any) => {
      // Retrieve the content of the file from Google Drive
      const postContent = await drive.files.get({
        fileId: file.id,
        alt: "media",
        fields: "data",
      });
      // Check if the post already exists in the database
      const existingPost = await db.post.findUnique({
        where: {
          googleId: file.id,
        },
      });

      // If the post already exists, return it
      if (existingPost) {
        return existingPost;
      }

      // Create a new post in the database
      const newPost = await db.post.create({
        data: {
          googleId: file.id,
          name: file.name,
          createdAt: file.createdTime,
          content: postContent.data,
        },
      });

      return newPost;
    }),
  );

  return response;
}
