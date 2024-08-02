"use client";

import Image, { StaticImageData } from "next/image";

import { Large } from "@/components/typography/large";
import { P } from "@/components/typography/p";
import { Small } from "@/components/typography/small";
import { useCountdown } from "@/lib/hook/use-contdown";
import { Badge } from "@/components/ui/badge";

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

interface EventCardThumbnailProps {
  image: string | StaticImageData;
  name: string;
  startAt: Date;
}

export const EventCardThumbnail = ({
  image,
  name,
  startAt,
}: EventCardThumbnailProps) => {
  const timeLeft = useCountdown(startAt);

  return (
    <div className="relative w-full h-60 flex flex-col-reverse">
      <Image
        src={image}
        alt={name}
        width={300}
        height={300}
        objectFit="cover"
        className="absolute size-full rounded-lg object-cover"
      />
      {timeLeft.some((value) => Number(value)) && (
        <Badge className="absolute top-3 left-3 bg-green-500 rounded-lg">
          <P className="text-secondary-foreground">Inscrições abertas</P>
        </Badge>
      )}
      <div className="h-fit bg-white/20 backdrop-blur-lg rounded-md flex flex-col items-center py-2 mx-3 mb-3">
        <Small className="text-white">Tempo restante</Small>
        <div className="flex gap-2">
          {timeLeft.map((time, index) => (
            <CountdownSegment key={index} value={time} label={labels[index]} />
          ))}
        </div>
      </div>
    </div>
  );
};
