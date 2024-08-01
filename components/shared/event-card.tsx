import { IEvent } from "@/lib/database/models/event.model";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { EventCardThumbnail } from "@/app/(root)/event-card-thumbnail";
import { getUserById } from "@/lib/actions/user.actions";
import { formatCurrency } from "@/lib/currency";
import Logo from "@/public/assets/images/lepoli.png";
import Image from "next/image";
import Link from "next/link";
import { Lead } from "../typography/lead";
import { Small } from "../typography/small";
import { Button } from "../ui/button";
import { P } from "../typography/p";

type CardProps = {
  event: IEvent;
  canManage?: boolean;
};

export const EventCard = async ({ event, canManage }: CardProps) => {
  // const user = await getUserById(event.organizer._id.toString());

  return (
    <Card>
      <CardHeader className="space-y-3">
        <EventCardThumbnail
          image={event.imageUrl}
          name={event.title}
          startAt={event.startDateTime}
        />
        <CardTitle>{event.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-10 flex justify-start items-start gap-3.5">
          <Image src={Logo} alt={"LePoli"} className="size-10 rounded-lg" />
          <div className="flex flex-col h-full justify-center items-start">
            <P className="font-bold">Organização</P>
            <Small>LePoli</Small>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex flex-col gap-1">
          <Small>Premiação</Small>
          <Lead>{formatCurrency(Number(event.reward))}</Lead>
        </div>
        <Button size={"lg"} asChild>
          <Link href={`/events/${event._id}`}>Participar</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
