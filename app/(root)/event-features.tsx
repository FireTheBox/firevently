"use client";

import { useEffect, useState } from "react";
import { Large } from "@/components/typography/large";
import { Muted } from "@/components/typography/muted";
import { formatCurrency } from "@/lib/currency";
import { Separator } from "@/components/ui/separator";

interface EventFeaturesProps {
  reward: string;
  isFree: boolean;
  price: string;
}

async function getParticipants() {
  const result = await fetch("/api/coda/participants");
  const body = await result.json();
  return body.participants.length;
}

async function getProjects() {
  const result = await fetch("/api/coda/projects/count");
  const body = await result.json();
  return body.projects;
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
      const projects = await getProjects();

      setNumberOfParticipants(participants);
      setNumberOfProjects(projects);
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
