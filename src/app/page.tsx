import Image from "next/image";
import Link from "next/link";
import generateImage from "~/server/generate-image";
import getPosts from "~/server/get-posts";

export const metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  const myposts = await getPosts();
  const generatedImage = await generateImage({
    prompt: "A painting of a cat.",
  });
  return <div>Hello</div>;
}
