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
  console.log("LOGGIN MYPOSTS: ", myposts);

  // myposts.forEach(async (post) => {
  //   await db.post.create({
  //     data: {
  //       name: post.name,
  //       content: post.content,
  //       coverImage: null,
  //     },
  //   });
  //   console.log("MYPOSTS.FOREACH HAS RUN");
  // });

  // const postsWithoutImage = await db.post.findMany({
  //   where: {
  //     coverImage: null,
  //   },
  // });
  // console.log("LOGGING POSTSWITHOUTIMAGE: ", postsWithoutImage);

  // postsWithoutImage.forEach(async (post) => {
  //   const generatedImage = await generateImage({
  //     prompt: post.content,
  //   });
  //   const uploadedImage = await uploadImage({
  //     imagePath: generatedImage[0]?.url as string,
  //   });
  //   await db.post.update({
  //     where: {
  //       id: post.id,
  //     },
  //     data: {
  //       coverImage: uploadedImage.url,
  //     },
  //   });
  // });

  // const posts = await db.post.findMany({
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });
  // console.log("LOGGING POSTS: ", posts);
  // check if a post has a cover image, if not, generate one.
  // download and upload to cloudinary and store it in the post object

  return (
    <div>Hello</div>
    //   <div>//
    //     <h1>Blog</h1>
    //     <ul>
    //       {posts.map((post) => (
    //         <li key={post.id}>
    //           <Link href={`/blog/${post.id}`}>
    //             <a>
    //               <h2>{post.name}</h2>
    //               <Image
    //                 src={post.coverImage as string}
    //                 alt={post.name}
    //                 width={400}
    //                 height={200}
    //               />
    //             </a>
    //           </Link>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
  );
}
