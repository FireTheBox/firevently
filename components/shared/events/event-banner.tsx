"use client";

import Image from "next/image";

import { Large } from "@/components/typography/large";
import { P } from "@/components/typography/p";
import { useCountdown } from "@/lib/hook/use-contdown";

interface CountdownSegmentProps {
  value: string;
  label: string;
}

function CountdownSegment({ value, label }: CountdownSegmentProps) {
  return (
    <div className="flex flex-col items-center justify-between">
      <Large className="text-4xl text-white">
        {value.toString().padStart(2, "0")}
      </Large>
      <P className="text-white">{label}</P>
    </div>
  );
}

interface CountdownTimerProps {
  targetDate: Date;
}

function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  return (
    <div className="flex h-36 flex-col items-center justify-start gap-3 rounded-xl bg-white/20 px-9 py-4 backdrop-blur-sm">
      <div className="text-center text-lg font-semibold text-white">
        Tempo restante
      </div>
      <div className="flex h-20 w-full items-center justify-around">
        <CountdownSegment value={days} label="Dias" />
        <div className="text-4xl font-extrabold text-white">:</div>
        <CountdownSegment value={hours} label="Horas" />
        <div className="text-4xl font-extrabold text-white">:</div>
        <CountdownSegment value={minutes} label="Min" />
        <div className="text-4xl font-extrabold text-white">:</div>
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
    <div className="relative">
      <Image
        src={image}
        alt="Banner do Evento"
        width={500}
        height={500}
        className="aspect-square size-[500px] rounded-lg object-cover"
      />

      <div className="absolute bottom-4 w-full px-4">
        <CountdownTimer targetDate={startAt} />
      </div>
    </div>
  );
};
