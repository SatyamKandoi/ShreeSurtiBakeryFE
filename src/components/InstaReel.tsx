import { useEffect } from "react";

export const InstaReelSquare = ({ reelUrl }: { reelUrl: string }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full max-w-xs aspect-square overflow-hidden rounded-lg shadow-md mx-auto">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={reelUrl}
        data-instgrm-version="14"
        style={{ width: "100%", height: "100%" }}
      ></blockquote>
    </div>
  );
};
