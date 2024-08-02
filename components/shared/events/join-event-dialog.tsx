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
  return (
    <>
      {email && participants?.includes(email) ? (
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
