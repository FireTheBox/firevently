"use client";

import { useEffect, useState } from "react";
import { Large } from "@/components/typography/large";
import { Muted } from "@/components/typography/muted";
import { formatCurrency } from "@/lib/currency";

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
    <ul className="flex border border-secondary-foreground rounded-md">
      <li className="text-center px-4 py-2 border-r border-secondary-foreground">
        <Large>{numberOfProjects}</Large>
        <Muted>Projetos</Muted>
      </li>
      <li className="text-center px-4 py-2 border-r border-secondary-foreground">
        <Large>{numberOfParticipants}</Large>
        <Muted>Participantes</Muted>
      </li>
      <li className="text-center px-4 py-2 border-r border-secondary-foreground">
        <Large>{formatCurrency(Number(reward))}</Large>
        <Muted>Premiação</Muted>
      </li>
      <li className="text-center px-4 py-2">
        <Large>{isFree ? "Free" : formatCurrency(Number(reward))}</Large>
        <Muted>Inscrição</Muted>
      </li>
    </ul>
  );
};
