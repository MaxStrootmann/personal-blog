import Image from "next/image";
import Link from "next/link";
import generateImage from "~/server/generate-image";
import getPosts from "~/server/get-posts";
import uploadImage from "~/server/upload-image";

export const metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  const myposts = await getPosts();
  const generatedImage = await generateImage({
    prompt: "A painting of a cat.",
  });
  console.log(generatedImage);
  const uploadedImage = await uploadImage({
    imagePath: generatedImage[0]?.url as string,
  });
  // check if a post has a cover image, if not, generate one.
  // download and upload to cloudinary and store it in the post object

  return <div>Hello</div>;
}
