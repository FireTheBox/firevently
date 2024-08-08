import { redirect } from "next/navigation";

import { OrganizerForm } from "@/components/shared/organizer/organizer-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getSession from "@/lib/auth/get-session";
import { isAdmin } from "@/lib/session";

export default async function CreateOrganizer() {
  const session = await getSession();

  if (!isAdmin(session)) {
    redirect("/");
  }

  return (
    <Card className="mx-auto mt-20 max-w-xl">
      <CardHeader>
        <CardTitle>Registrar Organizador</CardTitle>
      </CardHeader>
      <CardContent>
        <OrganizerForm operation="Registrar" />
      </CardContent>
    </Card>
  );
};
