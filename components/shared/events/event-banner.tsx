"use client";

import { LucideHeart } from "lucide-react";
import Image, { StaticImageData } from "next/image";

import { Large } from "@/components/typography/large";
import { P } from "@/components/typography/p";
import { useCountdown } from "@/lib/hook/use-contdown";

interface CountdownSegmentProps {
  value: string;
  label: string;
}

function CountdownSegment({ value, label }: CountdownSegmentProps) {
  return (
    <div className="flex flex-col justify-between items-center">
      <Large className="text-4xl">{value.toString().padStart(2, "0")}</Large>
      <P>{label}</P>
    </div>
  );
}

interface CountdownTimerProps {
  targetDate: Date;
}

function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  return (
    <div className="h-36 px-9 py-4 bg-purple-500/20 backdrop-blur-sm rounded-xl flex flex-col justify-start items-center gap-3">
      <div className="text-center text-white text-lg font-semibold font-montserrat">
        Tempo restante
      </div>
      <div className="w-full h-20 flex items-center justify-around">
        <CountdownSegment value={days} label="Dias" />
        <div className="text-white text-4xl font-extrabold font-montserrat">
          :
        </div>
        <CountdownSegment value={hours} label="Horas" />
        <div className="text-white text-4xl font-extrabold font-montserrat">
          :
        </div>
        <CountdownSegment value={minutes} label="Min" />
        <div className="text-white text-4xl font-extrabold font-montserrat">
          :
        </div>
        <CountdownSegment value={seconds} label="Seg" />
      </div>
    </div>
  );
}

interface EventBannerProps {
  image: string;
  startAt: Date;
}

export const EventBanner = ({ image, startAt }: EventBannerProps) => {
  return (
    <div className="relative rounded-xl overflow-hidden">
      <Image
        src={image}
        alt="Banner do Evento"
        width={500}
        height={500}
        className="w-full object-cover"
      />
      {/* <div className="flex justify-center items-center bg-primary/10 drop-shadow-lg hover:bg-primary/15 transition hover:cursor-pointer size-16 rounded-full absolute right-6 top-6">
        <LucideHeart size={40} />
      </div> */}
      <div className="absolute bottom-4 w-full px-4">
        <CountdownTimer targetDate={startAt} />
      </div>
    </div>
  );
};
