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
import { getAllEvents } from "@/lib/actions/event.actions";

import { EventFeatures } from "./event-features";
import { EventThumbnail } from "./event-thumbnail";
import { SkeletonHighlightEvent } from "./skeleton-highlight-event";

interface HighlightEventProps {
  query: string;
  category: string;
  page: number;
  limit: number;
}

export const HighlightEvent = async ({
  query,
  category,
  page,
  limit,
}: HighlightEventProps) => {
  const events = await getAllEvents({
    query,
    category,
    page,
    limit,
  });

  const lastEvent = events?.data.sort(function (a: any, b: any) {
    return (
      Date.parse(b.startDateTime as string) -
      Date.parse(a.startDateTime as string)
    );
  })[0];

  if (!lastEvent) {
    return <SkeletonHighlightEvent />;
  }

  const {
    _id,
    title,
    description,
    imageUrl,
    startDateTime,
    price,
    isFree,
    reward,
  } = lastEvent;

  return (
    <div className="col-span-3 flex flex-col items-start gap-6 rounded-lg bg-primary/5 p-6">
      <div className="flex flex-col items-center lg:flex-row lg:gap-6">
        <EventThumbnail
          image={imageUrl}
          name={title}
          startAt={new Date(Date.parse(startDateTime))}
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
      <EventFeatures eventId={_id}  reward={reward} isFree={isFree} price={price} />
    </div>
  );
};
