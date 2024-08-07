import Link from "next/link";

import { EventCardThumbnail } from "@/components/shared/events/event-card-thumbnail";
import { formatCurrency } from "@/lib/currency";
import { EventDocument } from "@/lib/event/event.definition";
import { getOrganizerById } from "@/lib/organizer/organizer.service";

import { Muted } from "../typography/muted";
import { P } from "../typography/p";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { OrganizerCard } from "./organizer/organizer-card";

type CardProps = {
  event: EventDocument;
};

export const EventCard = async ({ event }: CardProps) => {
  const { id, thumbnail, title, startDate, reward, organizer } = event;

  const organizerData = await getOrganizerById(organizer);

  return (
    <Card>
      <CardHeader className="space-y-3">
        <EventCardThumbnail
          image={thumbnail}
          name={title}
          startAt={startDate}
        />
        <CardTitle>{event.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <OrganizerCard organizer={organizerData} />
      </CardContent>
      <CardFooter className="flex flex-col gap-4 md:flex-row md:justify-between md:gap-0">
        <div className="flex w-full flex-col gap-1 md:w-fit">
          <Muted>Premiação</Muted>
          <P>{formatCurrency(reward)}</P>
        </div>
        <Button size={"lg"} className="w-full md:w-fit">
          <Link href={`/events/${id}`}>Participar</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
