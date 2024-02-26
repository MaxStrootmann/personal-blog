import InstaWall from "~/components/InstaWall";
import getPosts from "~/server/ig-get-posts";

export default async function Insta() {
  const posts = await getPosts();
  const images = posts.map(
    (post) => post.image_versions2.candidates[0]?.url,
  ) as string[];
  console.log("POSTS: ", images);
  return (
    <div>
      <h1>Instagram</h1>
      <p>Instagram posts will go here</p>
      <InstaWall images={images} />
    </div>
  );
}
