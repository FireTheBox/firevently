import Link from "next/link";

import { EventCardThumbnail } from "@/app/(root)/event-card-thumbnail";
import { formatCurrency } from "@/lib/currency";
import { IEvent } from "@/lib/database/models/event.model";
import LePoli from "@/public/assets/images/lepoli.png";
import Gathering from "@/public/assets/images/Logo_Gathering.png";

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
import OrganizationInfo from "./events/organization-info";

type CardProps = {
  event: IEvent;
};

export const EventCard = async ({ event }: CardProps) => {
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
        {event._id === "66b3bdfa0d97c5415ee6c2be" ? (
          <OrganizationInfo
            logo={Gathering}
            title="Planetiers World Gathering"
          />
        ) : (
          <OrganizationInfo
            logo={LePoli}
            title="Liga de Empreendedorismo da Poli-USP"
          />
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-4 md:flex-row md:justify-between md:gap-0">
        <div className="flex w-full flex-col gap-1 md:w-fit">
          <Muted>Premiação</Muted>
          <P>{event._id === "66b3bdfa0d97c5415ee6c2be" ? "Mentoria com Nguzu" : formatCurrency(Number(event.reward))}</P>
        </div>
        <Button size={"lg"} asChild className="w-full md:w-fit">
          <Link href={`/events/${event._id}`}>Participar</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
