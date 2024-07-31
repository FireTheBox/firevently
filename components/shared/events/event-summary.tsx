import { EventBanner } from "@/components/shared/events/event-banner";
import { EventCodeCard } from "@/components/shared/events/event-code-card";
import { EventStats } from "@/components/shared/events/event-stat";
import { JoinEventDialog } from "@/components/shared/events/join-event-dialog";
import OrganizationInfo from "@/components/shared/events/organization-info";
import { H2 } from "@/components/typography/h2";
import { Large } from "@/components/typography/large";
import { Lead } from "@/components/typography/lead";
import { Muted } from "@/components/typography/muted";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideVerified } from "lucide-react";

import EventCodeImage from "@/public/assets/images/event-code-image.png";
import LePoli from "@/public/assets/images/lepoli.png";

const ProjectTag = () => (
  <div className="absolute top-4 right-4 flex items-center gap-2.5 p-2.5 bg-secondary rounded-lg border border-secondary-foreground">
    <span className="text-secondary-foreground text-xs font-bold">
      Projeto Empreendedor
    </span>
  </div>
);

const EventHeader = () => (
  <div className="relative">
    <ProjectTag />
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Large className="inline">FireTheBox</Large>
        <LucideVerified className="text-secondary-foreground fill-cyan-400" />
      </div>
      <H2 className="text-muted-foreground">Lorem, ipsum dolor.</H2>
    </div>
  </div>
);

const EventDescription = () => (
  <div className="space-y-2">
    <Muted>Descrição</Muted>
    <Lead>
      Vestibulum faucibus eget erat eget pretium. Donec commodo convallis eget
      ust orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </Lead>
  </div>
);

const EventButtons = () => (
  <div className="w-full flex justify-between pt-4 gap-4">
    <JoinEventDialog />
    <Button size="lg" className="w-[300px]" variant="outline">
      Conversar com o organizador
    </Button>
  </div>
);

export const EventSummary = () => {
  return (
    <section className="flex items-start py-16 gap-16 border-b border-muted">
      <EventBanner />
      <Card className="basis-2/3 flex flex-col justify-between border-none">
        <CardHeader>
          <EventHeader />
        </CardHeader>
        <CardContent className="flex flex-col flex-1 space-y-6">
          <div className="flex justify-between">
            <OrganizationInfo logo={LePoli} title="Liga Poli-USP" />
            <EventCodeCard logo={EventCodeImage} code="0x12345678910111" />
          </div>
          <EventDescription />
          <EventStats />
        </CardContent>
        <CardFooter>
          <EventButtons />
        </CardFooter>
      </Card>
    </section>
  );
};
