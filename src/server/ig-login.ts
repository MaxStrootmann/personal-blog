import { IgApiClient } from "instagram-private-api";
import { env } from "~/env";

const ig = new IgApiClient();

export default async function login() {
  ig.state.generateDevice(env.INSTAGRAM_USERNAME);
  await ig.account.login(env.INSTAGRAM_USERNAME, env.INSTAGRAM_PASSWORD);
  return ig;
}
