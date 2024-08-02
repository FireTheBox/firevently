"use client";

import { EventBanner } from "@/components/shared/events/event-banner";
import { EventCodeCard } from "@/components/shared/events/event-code-card";
import { JoinEventDialog } from "@/components/shared/events/join-event-dialog";
import OrganizationInfo from "@/components/shared/events/organization-info";
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
import EventCodeImage from "@/public/assets/images/event-code-image.png";
import LePoli from "@/public/assets/images/lepoli.png";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { LoadingButton } from "../loading-button";
import { Stat } from "./event-stat";

function isRegistrationPeriod(startDateTime: any) {
  return Date.parse(startDateTime) - new Date().getTime() > 0;
}

interface EventSummaryProps {
  event: any;
  email?: string;
}

export const EventSummary = ({ event, email }: EventSummaryProps) => {
  const [participants, setParticipants] = useState<string[]>([]);
  const [numberOfProjects, setNumberOfProjects] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const participants = await getParticipants();
      const projects = await getProjectsCount();

      setParticipants(participants ?? []);
      setNumberOfProjects(projects ?? 0);
    };

    fetchData();
  }, []);

  const {
    _id,
    imageUrl,
    startDateTime,
    title,
    description,
    category,
    reward,
    isFree,
    price,
  } = event;

  return (
    <section className="flex flex-col items-center xl:flex-row xl:items-start py-8 xl:py-16 gap-8 xl:gap-16 border-b border-muted overflow-hidden">
      <EventBanner
        image={imageUrl}
        startAt={new Date(Date.parse(startDateTime))}
      />
      <Card className="w-full xl:w-fit border-none space-y-6">
        <CardHeader className="p-0 px-6">
          <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-center">
            <H2>{title}</H2>
            <div className="w-fit flex items-center gap-2.5 p-3 bg-secondary rounded-lg border border-secondary-foreground">
              <span className="text-secondary-foreground text-xs font-bold">
                {category.name}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row justify-between">
            <OrganizationInfo
              logo={LePoli}
              title="Liga de Empreendedorismo da Poli-USP"
            />
            <EventCodeCard logo={EventCodeImage} code={_id} />
          </div>
          <div className="space-y-2">
            <Muted>Descrição</Muted>
            <Lead>{description}</Lead>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row justify-between items-start">
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
              value={formatCurrency(Number(reward))}
              iconName="dollar-sign"
            />
            <Stat
              label=""
              value={isFree ? "Free" : formatCurrency(Number(reward))}
              iconName="ticket"
            />
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex flex-col sm:flex-row justify-between pt-4 gap-4">
            {isRegistrationPeriod(startDateTime) && (
              <Suspense fallback={<LoadingButton isLoading={true} />}>
                <JoinEventDialog
                  email={email}
                  eventName={title}
                  participants={participants}
                />
              </Suspense>
            )}
            <Button size="lg" className="w-full md:w-[300px]" variant="outline">
              <Link href={"mailto:contato@firethebox.com"}>
                Conversar com o organizador
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};
