import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { TallyFrame } from "../frame/tally-frame";

interface JoinEventDialogProps {
  eventId: string;
  eventName: string;
  participants: string[];
  email?: string;
}

export function JoinEventDialog({
  eventId,
  eventName,
  participants,
  email,
}: JoinEventDialogProps) {
  if (email && participants?.includes(email)) {
    return (
      <Button size="lg" className="w-full md:w-[300px]" disabled>
        Inscrito
      </Button>
    );
  }

  if (!email) {
    return (
      <Button size="lg" className="w-full md:w-[300px]" asChild>
        <Link href={`/sign-in?callbackUrl=/events/${eventId}`}>Participar</Link>
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full md:w-[300px]">
          Participar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-screen-md">
        <DialogHeader>
          <DialogTitle>{eventName}</DialogTitle>
        </DialogHeader>
        <TallyFrame embedUrl={eventId === "66b3bdfa0d97c5415ee6c2be" ? "https://tally.so/r/wgLGMN" : "https://tally.so/r/mV827y"} />
      </DialogContent>
    </Dialog>
  );
}
