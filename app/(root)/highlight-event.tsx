import { Muted } from "@/components/typography/muted";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { EventFeatures } from "./event-features";
import { EventThumbnail } from "./event-thumbnail";

interface HighlightEventProps {
  event: any;
}

export const HighlightEvent = ({ event }: HighlightEventProps) => {
  const {
    _id,
    title,
    description,
    imageUrl,
    startDateTime,
    price,
    isFree,
    reward,
  } = event;

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
