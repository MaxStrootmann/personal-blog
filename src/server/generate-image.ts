import OpenAI from "openai";
import { env } from "~/env";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export default async function generateImage({ prompt }: { prompt: string }) {
  function stylePrompt(prompt: string) {
    return `generate an OG image in a Swiss graphic design style without using any text, use this as inspiration: ${prompt}`;
  }
  try {
    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: stylePrompt(prompt),
    });
    return image;
  } catch (error) {
    console.error("OPENAI ERROR:", error);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      console.warn("OPENAI ERROR: second attempt");
      const image = await openai.images.generate({
        model: "dall-e-3",
        prompt: stylePrompt(prompt.slice(0, 200)),
      });
      return image;
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.error("OPENAI ERROR:", error);
    }
    try {
      console.warn(
        "OPENAI ERROR: third attempt, prompt = ",
        stylePrompt(prompt.slice(0, 100)),
      );
      const image = await openai.images.generate({
        model: "dall-e-3",
        prompt: stylePrompt(prompt.slice(0, 100)),
      });
    } catch (error) {
      console.error("OPENAI ERROR:", error);
      return null;
    }
  }
}
