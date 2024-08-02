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
import { Muted } from "../typography/muted";

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
        <div className="h-fit flex justify-start items-center gap-3.5">
          <Image src={Logo} alt={"LePoli"} className="size-12 rounded-lg" />
          <div className="flex flex-col h-full justify-start items-start">
            <Muted className="font-bold">Organização</Muted>
            <P>Liga de Empreendedorismo da Poli-USP</P>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 md:flex-row md:gap-0 md:justify-between">
        <div className="w-full md:w-fit flex flex-col gap-1">
          <Muted>Premiação</Muted>
          <P>{formatCurrency(Number(event.reward))}</P>
        </div>
        <Button size={"lg"} asChild className="w-full md:w-fit">
          <Link href={`/events/${event._id}`}>Participar</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
