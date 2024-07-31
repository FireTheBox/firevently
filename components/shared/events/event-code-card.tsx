import { LucideCopy } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import React from "react";

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
        alt="Código do projeto"
      />
      <div className="flex flex-col h-full justify-center items-start gap-2">
        <div className="text-white font-medium">Código do projeto</div>
        <div className="font-bold text-purple-700 flex items-center gap-2">
          <LucideCopy size={20} />
          {code}
        </div>
      </div>
    </div>
  );
};

export { EventCodeCard };
