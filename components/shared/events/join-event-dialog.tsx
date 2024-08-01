import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TallyFrame } from "../frame/tally-frame";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface JoinEventDialogProps {
  eventName: string;
  email?: string;
}

export function JoinEventDialog({ eventName, email }: JoinEventDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {email ? (
          <Button className="w-[300px] sm:w-full max-h-full">Participar</Button>
        ) : (
          <Button className="w-[300px] sm:w-full max-h-full" asChild>
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
  );
}
