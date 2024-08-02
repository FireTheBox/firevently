"use client";

import Image, { StaticImageData } from "next/image";

import { Large } from "@/components/typography/large";
import { P } from "@/components/typography/p";
import { Small } from "@/components/typography/small";
import { useCountdown } from "@/lib/hook/use-contdown";

import Logo from "@/public/assets/images/platform-dark-logo-small.png";

const labels = ["d", "h", "m", "s"];

interface CountdownSegmentProps {
  value: string;
  label: string;
}

function CountdownSegment({ value, label }: CountdownSegmentProps) {
  return (
    <div className="flex">
      <Large className="text-white">{value}</Large>
      <P className="text-white">{label}</P>
    </div>
  );
}

interface EventThumbnailProps {
  image: string | StaticImageData;
  name: string;
  startAt: Date;
}

export const EventThumbnail = ({
  image,
  name,
  startAt,
}: EventThumbnailProps) => {
  const timeLeft = useCountdown(startAt);

  return (
    <div className="relative w-fit rounded-md flex flex-col-reverse mx-auto">
      <Image
        src={image}
        alt={name}
        width={350}
        height={350}
        className="object-cover size-[350px] aspect-square rounded-lg"
      />

      <div className="absolute w-11/12 h-fit bg-primary/20 backdrop-blur-lg rounded-md flex flex-col items-center py-3 bottom-5 left-1/2 transform -translate-x-1/2">
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 size-10 bg-white rounded-full flex justify-center items-center">
          <Image src={Logo} alt={name} objectFit="cover" className="scale-90" />
        </div>

        <Small className="mt-4 text-white">Tempo restante</Small>
        <div className="flex gap-2">
          {timeLeft.map((time, index) => (
            <CountdownSegment key={index} value={time} label={labels[index]} />
          ))}
        </div>
      </div>
    </div>
  );
};
