import { env } from "~/env";
import login from "./ig-login";

export default async function getPosts() {
  const ig = await login();
  const user = await ig.user.searchExact(env.INSTAGRAM_USERNAME);
  const userFeed = ig.feed.user(user.pk);
  const myPosts = await userFeed.items();
  return myPosts;
}
