import { LucideHeart } from "lucide-react";
import Image from "next/image";
import { CountdownTimer } from "../countdown-timer";

import BannerImage from "@/public/assets/images/event-banner.png";

export const EventBanner = () => {
  return (
    <div className="relative rounded-xl overflow-hidden">
      <Image
        src={BannerImage}
        alt="Banner do Evento"
        objectFit="cover"
        className="w-full max-w-[500px]"
      />
      <div className="flex justify-center items-center bg-primary/10 drop-shadow-lg hover:bg-primary/15 transition hover:cursor-pointer size-16 rounded-full absolute right-6 top-6">
        <LucideHeart size={40} />
      </div>
      <div className="absolute bottom-4 w-full px-4">
        <CountdownTimer
          targetDate={new Date(new Date().getTime() + 12 * 3600 * 1000)}
        />
      </div>
    </div>
  );
};
