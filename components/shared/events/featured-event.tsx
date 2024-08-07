import Link from "next/link";

import { Muted } from "@/components/typography/muted";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getFeaturedEvent } from "@/lib/event/event.service";

import { EventFeatures } from "./event-features";
import { EventThumbnail } from "./event-thumbnail";
import { SkeletonFeaturedEvent } from "./skeleton-featured-event";

export const FeaturedEvent = async () => {
  
  const featuredEvent = await getFeaturedEvent()

  if (!featuredEvent) {
    return <SkeletonFeaturedEvent />;
  }

  const {
    _id,
    title,
    description,
    thumbnail,
    startDate,
    reward,
    registrationFee
  } = featuredEvent;

  return (
    <div className="col-span-3 flex flex-col items-start gap-6 rounded-lg bg-primary/5 p-6">
      <div className="flex flex-col items-center lg:flex-row lg:gap-6">
        <EventThumbnail
          image={thumbnail}
          name={title}
          startAt={startDate}
        />
        <Card className="w-full border-none bg-transparent shadow-none lg:basis-1/2">
          <CardHeader className="px-0">
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <Muted>{description}</Muted>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-10 px-0">
            <Button asChild size={"lg"}>
              <Link href={`/events/${_id}`}>Participar</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <EventFeatures reward={reward} registrationFee={registrationFee} />
    </div>
  );
};
