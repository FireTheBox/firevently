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
  participants: string[];
  email?: string;
}

export function JoinEventDialog({
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
        <Link href={"/sign-in"}>Participar</Link>
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
        <TallyFrame embedUrl="https://tally.so/r/mV827y" />
      </DialogContent>
    </Dialog>
  );
}
