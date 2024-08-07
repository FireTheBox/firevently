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
    <div className="flex h-20 w-fit items-center justify-start gap-3.5">
      <Link href={`/organizer/${id}`} target="_blank">
        <Avatar className="size-20 rounded-lg">
          <AvatarImage src={logo} alt={name} />
          <AvatarFallback />
        </Avatar>
        <div className="flex h-full flex-col items-start justify-center gap-2">
          <Large>Organização</Large>
          <P>{name}</P>
        </div>
      </Link>
    </div>
  );
}
