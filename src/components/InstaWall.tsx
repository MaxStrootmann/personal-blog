"use client";

import Image from "next/image";

export default function InstaWall({ images }: { images: string[] }) {
  return (
    <div>
      <h1>Instagram</h1>
      <p>Instagram posts will go here</p>
      {images.map((image) => {
        return (
          <Image
            src={
              image.replace(
                /^[^.]*/,
                "scontent-ams2-1.cdninstagram.com",
              ) as string
            }
            alt="henky"
            width={300}
            height={300}
          />
        );
      })}
    </div>
  );
}
