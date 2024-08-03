"use client";

import Image, { StaticImageData } from "next/image";

import { Large } from "@/components/typography/large";
import { P } from "@/components/typography/p";
import { Small } from "@/components/typography/small";
import { useCountdown } from "@/lib/hook/use-contdown";
import Logo from "@/public/assets/images/lepoli.png";

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
    <div className="relative mx-auto flex w-fit flex-col-reverse rounded-md">
      <Image
        src={image}
        alt={name}
        width={350}
        height={350}
        className="aspect-square size-[350px] rounded-lg object-cover"
      />

      <div className="absolute bottom-5 left-1/2 flex h-fit w-11/12 -translate-x-1/2 flex-col items-center rounded-md bg-white/20 py-3 backdrop-blur-lg">
        <div className="absolute -top-5 left-1/2 flex size-10 -translate-x-1/2 items-center justify-center rounded-full bg-white">
          <Image src={Logo} alt={name} objectFit="cover" className="scale-90 rounded-full bg-clip-border" />
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
