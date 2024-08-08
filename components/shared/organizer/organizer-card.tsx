import { Avatar } from "@radix-ui/react-avatar";
import Link from "next/link";

import { Large } from "@/components/typography/large";
import { P } from "@/components/typography/p";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { OrganizerDocument } from "@/lib/organizer/organizer.definition";

interface OrganizerCardProps {
  organizer: OrganizerDocument | null;
}

export function OrganizerCard({ organizer }: OrganizerCardProps) {
  if (!organizer) {
    return;
  }

  const { id, logo, name } = organizer;

  return (
    <Link
      href={`/organizer/${id}`}
      target="_blank"
      className="flex h-20 w-full items-center justify-start gap-3.5"
    >
      <Avatar className="size-20">
        <AvatarImage src={logo} alt={name} className=" rounded-lg object-cover" />
        <AvatarFallback className="rounded-lg text-3xl">{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex h-full flex-col items-start justify-center gap-2">
        <Large>Organização</Large>
        <P>{name}</P>
      </div>
    </Link>
  );
}
