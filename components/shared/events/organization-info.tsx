import Image, { StaticImageData } from "next/image";
import React from "react";

import { Large } from "@/components/typography/large";
import { P } from "@/components/typography/p";

interface OrganizationInfoProps {
  logo: StaticImageData;
  title: string;
}

const OrganizationInfo: React.FC<OrganizationInfoProps> = ({
  logo: image,
  title: title,
}) => {
  return (
    <div className="flex h-20 w-fit items-center justify-start gap-3.5">
      <Image className="size-20 rounded-lg" src={image} alt={title} />
      <div className="flex h-full flex-col items-start justify-center gap-2">
        <Large>Organização</Large>
        <P>{title}</P>
      </div>
    </div>
  );
};

export default OrganizationInfo;
