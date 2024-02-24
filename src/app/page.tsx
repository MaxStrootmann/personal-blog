import Image from "next/image";
import Link from "next/link";
import { format } from "path";
import formatDate from "~/lib/formatDate";
import parsedContent from "~/lib/parseMarkdown";
import { db } from "~/server/db";
import generateImage from "~/server/generate-image";
import getPosts from "~/server/get-posts";
import uploadImage from "~/server/upload-image";

export default async function BlogPage() {
  // Get all posts and put in db
  await getPosts();

  //Go over all posts, check if they have a cover image, if not, generate one
  const postsWithoutImage = await db.post.findMany({
    where: {
      coverImage: null,
    },
  });
  console.log("POSTS WITHOUT IMAGE: ", postsWithoutImage);

  // Go over all posts without a cover image
  for (const post of postsWithoutImage) {
    // Generate an image based on the first 400 characters of the post content
    // but first filter out anything that might be a content policy violation of openai
    const filteredContent = post.content
      .slice(0, 400)
      .replace(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g, "");

    const generatedImage = await generateImage({
      prompt: filteredContent as string,
    });
    console.log("OPENAI URL: ", generatedImage?.data[0]?.url);
    // Upload the generated image to the server
    const uploadedImage = await uploadImage({
      imagePath: generatedImage?.data[0]?.url as string,
    });

    // Update the post with the new cover image
    await db.post.update({
      where: {
        id: post.id,
      },
      data: {
        coverImage: uploadedImage,
      },
    });

    // Add a delay of 1 second between each iteration to avoid openai rate limits
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  // put the posts in an array
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  function formatName(name: string) {
    return name.replace(".md", "");
  }

  return (
    <div className="container max-w-4xl px-4 py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-bold tracking-tight lg:text-5xl">
            Blog by Max
          </h1>
          <p className="text-muted-foreground text-xl">
            A Next.js blog built using Obsidian.md, Google Drive and DALL-E 3.
            Read about my projects and thoughts on webdesign & development.
            {/* Images are from artists and authors i would like to promote. Links are at the start of the post. */}
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {posts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className="group relative flex flex-col space-y-2"
            >
              {post.coverImage && (
                <Image
                  src={post.coverImage}
                  alt={formatName(post.name)}
                  width={804}
                  height={452}
                  className="bg-muted rounded-md border transition-colors"
                  priority={index <= 1}
                />
              )}
              <h2 className="text-2xl font-extrabold">
                {formatName(post.name)}
              </h2>
              {post.content && <div className="">{parsedContent(post)}</div>}
              {post.createdAt && (
                <p className="text-muted-foreground text-sm">
                  {formatDate(post.createdAt)}
                </p>
              )}
              {/* need to add post.slug here for the href and figure out the dynamic routing thing */}
              <Link
                href={
                  "/blog/" +
                  formatName(post.name).toLowerCase().replace(/ /g, "-")
                }
                className="absolute inset-0"
              >
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  );
}
