import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TallyFrame } from "../frame/tally-frame";
import { Button } from "@/components/ui/button";

export function JoinEventDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[300px] max-h-full">Participar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-screen-md">
        <DialogHeader>
          <DialogTitle>Lorem Ipsum Dolor</DialogTitle>
        </DialogHeader>
        <TallyFrame embedUrl="https://tally.so/embed/m6xx2N" />
      </DialogContent>
    </Dialog>
  );
}
