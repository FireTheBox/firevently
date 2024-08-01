"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { TallyFrame } from "../frame/tally-frame";

interface JoinEventDialogProps {
  eventName: string;
  email?: string;
}

async function getParticipants() {
  const result = await fetch("/api/coda/participants");
  const body = await result.json();
  return body.participants;
}

export async function JoinEventDialog({
  eventName,
  email,
}: JoinEventDialogProps) {
  const result = await getParticipants();

  return (
    <>
      {email && result.includes(email) ? (
        <Button size="lg" className="w-[300px] sm:w-full max-h-full" disabled>
          Inscrito
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            {email ? (
              <Button size="lg" className="w-[300px] sm:w-full max-h-full">
                Participar
              </Button>
            ) : (
              <Button
                size="lg"
                className="w-[300px] sm:w-full max-h-full"
                asChild
              >
                <Link href={"/sign-in"}>Participar</Link>
              </Button>
            )}
          </DialogTrigger>
          <DialogContent className="sm:max-w-screen-md">
            <DialogHeader>
              <DialogTitle>{eventName}</DialogTitle>
            </DialogHeader>
            <TallyFrame embedUrl="https://tally.so/r/mV827y" />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
