import Image from "next/image";
import Link from "next/link";
import { db } from "~/server/db";
import generateImage from "~/server/generate-image";
import getPosts from "~/server/get-posts";
import uploadImage from "~/server/upload-image";

export const metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  const myposts = await getPosts();

  myposts.forEach(async (post) => {
    const postsWithoutImage = await db.post.findMany({
      where: {
        coverImage: null,
      },
    });

    for (const post of postsWithoutImage) {
      const generatedImage = await generateImage({
        prompt: post.content.slice(0, 400) as string,
      });
      const uploadedImage = await uploadImage({
        imagePath: generatedImage[0]?.url as string,
      });
      await db.post.update({
        where: {
          id: post.id,
        },
        data: {
          coverImage: uploadedImage.url,
        },
      });

      // Add a delay of 1 second between each iteration
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  });

  console.log("LOGGING BLOGPOSTS: ", myposts);

  // const posts = await db.post.findMany({
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });
  // console.log("LOGGING POSTS: ", posts);
  //   return posts

  //     myposts.forEach(async (post) => {
  //   const postsWithoutImage = await db.post.findMany({
  //     where: {
  //       coverImage: null,
  //     },
  //   });
  //   console.log("LOGGING POSTSWITHOUTIMAGE: ", postsWithoutImage);

  //   postsWithoutImage.forEach(async (post) => {
  //     const generatedImage = await generateImage({
  //       prompt: post.content,
  //     });
  //     const uploadedImage = await uploadImage({
  //       imagePath: generatedImage[0]?.url as string,
  //     });
  //     await db.post.update({
  //       where: {
  //         id: post.id,
  //       },
  //       data: {
  //         coverImage: uploadedImage.url,
  //       },
  //     });

  //   const posts = await db.post.findMany({
  //     orderBy: {
  //       createdAt: "desc",
  //     },
  //   });
  //   console.log("LOGGING POSTS: ", posts);
  //   return posts;
  // });
  // check if a post has a cover image, if not, generate one.
  // download and upload to cloudinary and store it in the post object

  return (
    <div>
      <h1>Blog</h1>
    </div>
  );
}
