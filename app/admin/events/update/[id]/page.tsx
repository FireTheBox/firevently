
import NotFound from "@/app/not-found";
import { EventForm } from "@/components/shared/event-form";
import getSession from "@/lib/auth/get-session";
import { getEventById } from "@/lib/event/event.service";
import { getOrganizerById } from "@/lib/organizer/organizer.service";
import { getUserEmail, isAdmin } from "@/lib/session";

import { H3 } from "../../../../../components/typography/h3";

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const session = await getSession();

  if (!isAdmin(session)) {
    return <NotFound />;
  }

  const event = await getEventById(id);

  if (!event?.organizer) {
    return <NotFound />;
  }

  const organizer = await getOrganizerById(event.organizer);

  if (getUserEmail(session) !== organizer?.email) {
    return <NotFound />;
  }

  return (
    <section className="space-y-4 py-5 md:py-10">
      <H3>Atualizar Evento</H3>
      <EventForm operation="Atualizar" />
    </section>
  );
};

export default UpdateEvent;
