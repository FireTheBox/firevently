
import { Large } from "@/components/typography/large";
import { P } from "@/components/typography/p";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrganizerById } from "@/lib/organizer/organizer.service";

import OrganizerNotFound from "./not-found";

interface OrganizerPageProps {
  params: {
    id: string;
  };
}

export default async function OrganizerPage({ params }: OrganizerPageProps) {
  const organizer = await getOrganizerById(params.id);

  if (!organizer) {
    return <OrganizerNotFound />;
  }

  const { name, logo, contact } = organizer;

  return (
    <Card className="mx-auto mt-20 max-w-md">
      <CardHeader>
        <CardTitle>Informações do organizador</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <Avatar className="size-20">
          <AvatarImage
            src={logo}
            alt={`Logo de ${name}`}
            className="object-cover"
          />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <div className="flex items-end gap-2">
          <Large>Organização: </Large>
          <P className="leading-normal">{name}</P>
        </div>
        <Button className="w-full">
          <a href={contact} target="_blank">
            Contato
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
