import Image from "next/image";

import BgImage from "@/public/assets/images/highlight-event-bg-image.png";
import { Small } from "../../components/typography/small";
import { Large } from "@/components/typography/large";
import { CountdownTimer } from "@/components/shared/countdown-timer";
import { formatCurrency } from "@/lib/currency";

import Logo from "@/public/assets/images/platform-dark-logo-small.png";

interface EventThumbnailProps {
  name: string;
  price: number;
  startAt: Date;
}

export const EventThumbnail = ({
  name,
  price,
  startAt,
}: EventThumbnailProps) => {
  return (
    <div className="relative size-full rounded-md flex flex-col-reverse">
      <Image
        src={BgImage}
        alt={name}
        objectFit="cover"
        className="absolute size-full"
      />
      <div className="h-fit relative bg-primary/20 backdrop-blur-lg rounded-md flex flex-col items-center px-3 py-3 mx-2 mb-5">
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 size-10 bg-primary rounded-full flex justify-center items-center">
          <Image src={Logo} alt={name} objectFit="cover" className="scale-90" />
        </div>

        <Small className="mt-4">Tempo restante</Small>
        <CountdownTimer targetDate={startAt} />
      </div>
    </div>
  );
};
