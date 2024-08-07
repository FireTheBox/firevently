"use client";

import Link from "next/link";
import { Session } from "next-auth";
import { Suspense, useEffect, useState } from "react";

import { EventBanner } from "@/components/shared/events/event-banner";
import { EventCodeCard } from "@/components/shared/events/event-code-card";
import { JoinEventDialog } from "@/components/shared/events/join-event-dialog";
import { H2 } from "@/components/typography/h2";
import { Lead } from "@/components/typography/lead";
import { Muted } from "@/components/typography/muted";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getParticipants } from "@/lib/coda/get-participants.action";
import { getProjectsCount } from "@/lib/coda/get-projects-count.action";
import { formatCurrency } from "@/lib/currency";
import { EventDocument } from "@/lib/event/event.definition";
import { OrganizerDocument } from "@/lib/organizer/organizer.definition";
import { getUserEmail } from "@/lib/session";
import EventCodeImage from "@/public/assets/images/event-code-image.png";

import { LoadingButton } from "../loading-button";
import { OrganizerCard } from "../organizer/organizer-card";
import { Stat } from "./event-stat";

function isRegistrationPeriod(startDateTime: any) {
  return Date.parse(startDateTime) - new Date().getTime() > 0;
}

interface EventSummaryProps {
  event: EventDocument;
  session: Session | null;
}

export const EventSummary = ({ event, session }: EventSummaryProps) => {
  const [participants, setParticipants] = useState<string[]>([]);
  const [numberOfProjects, setNumberOfProjects] = useState<number>(0);

  const email = getUserEmail(session)

  useEffect(() => {
    const fetchData = async () => {
      const participants = await getParticipants();
      const projects = await getProjectsCount();

      setParticipants(participants ?? []);
      setNumberOfProjects(projects ?? 0);
    };

    fetchData();
  }, [participants, numberOfProjects]);

  const { id, thumbnail, title, description, startDate, category, registrationFee, reward, communityInvitation } = event;

  return (
    <section className="flex flex-col items-center gap-8 overflow-hidden border-b border-muted py-8 xl:flex-row xl:items-start xl:gap-16 xl:py-16">
      <EventBanner
        image={thumbnail}
        startAt={startDate}
      />
      <Card className="w-full space-y-6 border-none xl:w-fit">
        <CardHeader className="p-0 md:px-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <H2>{title}</H2>
            <div className="flex w-fit items-center gap-2.5 rounded-lg border border-secondary-foreground bg-secondary p-3">
              <span className="text-xs font-bold text-secondary-foreground">
                {category}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col space-y-6 px-0 md:px-6">
          <div className="my-10 flex flex-col justify-between gap-5 md:flex-row">
            {/* FIXME */}
            <OrganizerCard organizer={{} as OrganizerDocument} />
            <EventCodeCard logo={EventCodeImage} code={id} />
          </div>
          <div className="space-y-2">
            <Muted>Descrição</Muted>
            <Lead>{description}</Lead>
          </div>
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
            <Stat
              label="Projetos"
              value={numberOfProjects.toString()}
              iconName="circle-play"
            />
            <Stat
              label="Participantes"
              value={participants.length.toString()}
              iconName="users"
            />
            <Stat
              label="Premiação"
              value={formatCurrency(reward)}
              iconName="dollar-sign"
            />
            <Stat
              label=""
              value={registrationFee === 0 ? "Free" : formatCurrency(registrationFee)}
              iconName="ticket"
            />
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full flex-col justify-between gap-4 pt-4 sm:flex-row">
            {isRegistrationPeriod(startDate) && (
              <Suspense fallback={<LoadingButton isLoading={true} />}>
                <JoinEventDialog
                  email={email}
                  eventId={id}
                  eventName={title}
                  participants={participants}
                />
              </Suspense>
            )}
            {email && participants.includes(email) ? (
              <Button
                size="lg"
                className="w-full md:w-[300px]"
                variant="outline"
              >
                <Link href={communityInvitation}>Entrar para comunidade</Link>
              </Button>
            ) : (
              <Button
                size="lg"
                className="w-full md:w-[300px]"
                variant="outline"
              >
                {/* FIXME */}
                <Link
                  href={``}
                >
                  Conversar com o organizador
                </Link>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};
