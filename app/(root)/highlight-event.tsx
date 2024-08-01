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
import Link from "next/link";
import { EventFeatures } from "./event-features";
import { EventThumbnail } from "./event-thumbnail";

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
    <div className="col-span-3 w-full flex items-end bg-primary/5 rounded-lg p-8">
      <Card className="basis-2/4 w-full border-none bg-transparent">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Muted>{description}</Muted>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-10">
          <Button asChild size={"lg"}>
            <Link href={`/events/${_id}`}>Participar</Link>
          </Button>
          <EventFeatures reward={reward} isFree={isFree} price={price} />
        </CardFooter>
      </Card>
      <EventThumbnail
        image={imageUrl}
        name={title}
        startAt={new Date(Date.parse(startDateTime))}
      />
    </div>
  );
};
