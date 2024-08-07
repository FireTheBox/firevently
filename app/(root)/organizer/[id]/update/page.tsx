import { redirect } from "next/navigation";

import { OrganizerForm } from "@/components/shared/organizer/organizer-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getSession from "@/lib/auth/get-session";
import { getOrganizerById } from "@/lib/organizer/organizer.service";
import { isAdmin } from "@/lib/session";

import OrganizerNotFound from "../not-found";

interface UpdateOrganizerProps {
  params: {
    id: string;
  };
}

export default async function UpdateOrganizer({
  params,
}: UpdateOrganizerProps) {
  const session = await getSession();

  if (!isAdmin(session)) {
    redirect("/");
  }

  const organizerId = params.id;

  const organizer = await getOrganizerById(organizerId);

  if (!organizer) {
    return <OrganizerNotFound />;
  }

  const { name, logo, contact } = organizer;

  return (
    <Card className="mx-auto mt-20 max-w-xl">
      <CardHeader>
        <CardTitle>Editar Organizador</CardTitle>
      </CardHeader>
      <CardContent>
        <OrganizerForm
          operation="Atualizar"
          id={organizerId}
          name={name}
          logo={logo}
          contact={contact}
        />
      </CardContent>
    </Card>
  );
}
