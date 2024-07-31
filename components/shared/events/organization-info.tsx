import Image, { StaticImageData } from "next/image";
import React from "react";

interface OrganizationInfoProps {
  logo: StaticImageData;
  title: string;
}

const OrganizationInfo: React.FC<OrganizationInfoProps> = ({
  logo: image,
  title: title,
}) => {
  return (
    <div className="w-64 h-20 flex justify-start items-start gap-3.5">
      <Image className="size-20 rounded-lg" src={image} alt={title} />
      <div className="flex flex-col h-full justify-center items-start gap-2">
        <div className="text-white/70 font-medium">
          Organização
        </div>
        <div className="text-white font-bold">
          {title}
        </div>
      </div>
    </div>
  );
};

export default OrganizationInfo;
