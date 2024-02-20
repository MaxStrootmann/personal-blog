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
  }
}
