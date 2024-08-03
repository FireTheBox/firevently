import Image, { StaticImageData } from "next/image";
import React from "react";

import { Large } from "@/components/typography/large";

import { CopyButton } from "../copy-button";

interface EventCodeCardProps {
  logo: StaticImageData;
  code: string;
}

const EventCodeCard: React.FC<EventCodeCardProps> = ({ logo, code }) => {
  return (
    <div className="flex h-20 w-fit items-center justify-start gap-3.5">
      <Image
        className="size-20 rounded-lg"
        src={logo}
        alt="Logo da organização"
      />
      <div className="flex h-full flex-col items-start justify-center gap-2">
        <Large>Código do evento</Large>
        <CopyButton value={code} />
      </div>
    </div>
  );
};

export { EventCodeCard };
