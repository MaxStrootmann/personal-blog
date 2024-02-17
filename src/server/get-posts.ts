import { env } from "~/env";
import { drive } from "~/server/google-api";

interface Post {
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

  const fileIds = listOfFiles.data.files.map((file: any) => file.id);

  const response = await Promise.all(
    fileIds.map(async (fileId: string) => {
      const file = await drive.files.get({
        fileId,
        alt: "media",
      });

      return {
        name: file.data.name,
        createdDate: file.data.createdTime,
        content: file.data,
      };
    }),
  );

  return response;
};

export default getPosts;
