"use client";

import { useEffect, useState } from "react";

import { Large } from "@/components/typography/large";
import { Muted } from "@/components/typography/muted";
import { getParticipants } from "@/lib/coda/get-participants.action";
import { getProjectsCount } from "@/lib/coda/get-projects-count.action";
import { formatCurrency } from "@/lib/currency";

interface EventFeaturesProps {
  eventId: string;
  reward: string;
  isFree: boolean;
  price: string;
}

export const EventFeatures = ({ eventId, reward, isFree }: EventFeaturesProps) => {
  const [numberOfParticipants, setNumberOfParticipants] = useState<number>(0);
  const [numberOfProjects, setNumberOfProjects] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const participants = await getParticipants(eventId);
      const projects = await getProjectsCount(eventId);

      setNumberOfParticipants(participants?.length ?? 0);
      setNumberOfProjects(projects ?? 0);
    };

    fetchData();
  }, []);

  return (
    <ul className="grid w-full grid-cols-2 place-items-center gap-4 rounded-md border border-secondary-foreground p-4 md:grid-cols-7">
      <li className="text-center">
        <Large>{numberOfProjects}</Large>
        <Muted>Projetos</Muted>
      </li>
      <div className="hidden bg-secondary-foreground md:block md:h-full md:w-px" />
      <li className="text-center">
        <Large>{numberOfParticipants}</Large>
        <Muted>Participantes</Muted>
      </li>
      <div className="col-span-3 h-px w-full bg-secondary-foreground md:col-span-1 md:h-full md:w-px" />
      <li className="text-center">
        <Large>{formatCurrency(Number(reward))}</Large>
        <Muted>Premiação</Muted>
      </li>
      <div className="hidden bg-secondary-foreground md:block md:h-full md:w-px" />
      <li className="text-center">
        <Large>{isFree ? "Free" : formatCurrency(Number(reward))}</Large>
        <Muted>Inscrição</Muted>
      </li>
    </ul>
  );
};
