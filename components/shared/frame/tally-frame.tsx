"use client";

import Script from "next/script";
import React, { useEffect } from "react";

interface TallyFrameProps {
  embedUrl: string;
}

export const TallyFrame: React.FC<TallyFrameProps> = ({ embedUrl }) => {
  return (
    <div>
      <iframe
        data-tally-src={`${embedUrl}?alignLeft=1&hideTitle=1`}
        loading="lazy"
        width="100%"
        height={500}
      ></iframe>

      <Script
        src="https://tally.so/widgets/embed.js"
        onLoad={() => Tally.loadEmbeds()}
      />
    </div>
  );
};
