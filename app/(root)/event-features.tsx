"use client";

import { useEffect, useState } from "react";
import { Large } from "@/components/typography/large";
import { Muted } from "@/components/typography/muted";
import { formatCurrency } from "@/lib/currency";
import { Separator } from "@/components/ui/separator";
import { getParticipants } from "@/lib/coda/get-participants.action";
import { getProjectsCount } from "@/lib/coda/get-projects-count.action";

interface EventFeaturesProps {
  reward: string;
  isFree: boolean;
  price: string;
}

export const EventFeatures = ({
  reward,
  isFree,
  price,
}: EventFeaturesProps) => {
  const [numberOfParticipants, setNumberOfParticipants] = useState<number>(0);
  const [numberOfProjects, setNumberOfProjects] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const participants = await getParticipants();
      const projects = await getProjectsCount();

      setNumberOfParticipants(participants?.length ?? 0);
      setNumberOfProjects(projects ?? 0);
    };

    fetchData();
  }, []);

  return (
    <ul className="w-full grid grid-cols-2 md:grid-cols-7 place-items-center border border-secondary-foreground rounded-md gap-4 p-4">
      <li className="text-center">
        <Large>{numberOfProjects}</Large>
        <Muted>Projetos</Muted>
      </li>
      <div className="hidden md:block md:w-px md:h-full bg-secondary-foreground" />
      <li className="text-center">
        <Large>{numberOfParticipants}</Large>
        <Muted>Participantes</Muted>
      </li>
      <div className="h-px w-full col-span-3 md:w-px md:h-full md:col-span-1 bg-secondary-foreground" />
      <li className="text-center">
        <Large>{formatCurrency(Number(reward))}</Large>
        <Muted>Premiação</Muted>
      </li>
      <div className="hidden md:block md:w-px md:h-full bg-secondary-foreground" />
      <li className="text-center">
        <Large>{isFree ? "Free" : formatCurrency(Number(reward))}</Large>
        <Muted>Inscrição</Muted>
      </li>
    </ul>
  );
};
