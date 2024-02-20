import OpenAI from "openai";
import { env } from "~/env";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export default async function generateImage({ prompt }: { prompt: string }) {
  try {
    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
    });
    return image;
  } catch (error) {
    console.error("OPENAI ERROR:", error);
    try {
      const image = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt.slice(0, 200),
      });
      return image;
    } catch (error) {
      console.error("OPENAI ERROR:", error);
    }
    try {
      const image = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt.slice(0, 100),
      });
    } catch (error) {
      console.error("OPENAI ERROR:", error);
      return null;
    }
  }
}
