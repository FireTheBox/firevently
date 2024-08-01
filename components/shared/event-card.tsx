import { IEvent } from "@/lib/database/models/event.model";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import OrganizationInfo from "./events/organization-info";

import { EventCardThumbnail } from "@/app/(root)/event-card-thumbnail";
import { formatCurrency } from "@/lib/currency";
import Logo from "@/public/assets/images/lepoli.png";
import Link from "next/link";
import { Lead } from "../typography/lead";
import { Small } from "../typography/small";
import { Button } from "../ui/button";
import Image from "next/image";

type CardProps = {
  event: IEvent;
  canManage?: boolean;
};

export const EventCard = async ({ event, canManage }: CardProps) => {
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
          <Image
            src={Logo}
            alt={event.organizer.username}
            className="size-10 rounded-lg"
          />
          <div className="flex flex-col h-full justify-center items-start gap-2">
            <div className="text-white/70 font-medium">Organização</div>
            <div className="text-white font-bold">
              {event.organizer.username}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex flex-col gap-1">
          <Small>Premiação</Small>
          <Lead>{formatCurrency(Number(event.reward))}</Lead>
        </div>
        <Button size={"lg"} asChild>
          <Link href={`/events/${event.id}`}>Participar</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
