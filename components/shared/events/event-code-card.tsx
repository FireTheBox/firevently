import Image, { StaticImageData } from "next/image";
import React from "react";
import { CopyButton } from "../copy-button";

interface EventCodeCardProps {
  logo: StaticImageData;
  code: string;
}

const EventCodeCard: React.FC<EventCodeCardProps> = ({ logo, code }) => {
  return (
    <div className="w-fit h-20 flex justify-start items-start gap-3.5">
      <Image
        className="size-20 rounded-lg"
        src={logo}
        alt="Logo da organização"
      />
      <div className="flex flex-col h-full justify-center items-start gap-2">
        <div className="text-white font-medium">Código do evento</div>
        <CopyButton value={code} />
      </div>
    </div>
  );
};

export { EventCodeCard };
