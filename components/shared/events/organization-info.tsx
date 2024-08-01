import { Large } from "@/components/typography/large";
import { P } from "@/components/typography/p";
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
    <div className="w-full h-20 flex justify-start items-start gap-3.5">
      <Image className="size-20 rounded-lg" src={image} alt={title} />
      <div className="flex flex-col h-full justify-center items-start gap-2">
        <Large>Organização</Large>
        <P>{title}</P>
      </div>
    </div>
  );
};

export default OrganizationInfo;
