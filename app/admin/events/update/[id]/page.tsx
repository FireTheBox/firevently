import NotFound from "@/app/not-found";
import { CodaPageForm } from "@/components/shared/coda/coda-page-forms";
import { EventForm } from "@/components/shared/event-form";
import { H3 } from "@/components/typography/h3";
import { Separator } from "@/components/ui/separator";
import getSession from "@/lib/auth/get-session";
import {
  getCategoryById,
} from "@/lib/category/category.service";
import { getEventById } from "@/lib/event/event.service";
import { getOrganizerById } from "@/lib/organizer/organizer.service";
import { getUserEmail, isAdmin } from "@/lib/session";

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

  if (!organizer || getUserEmail(session) !== organizer?.email) {
    return <NotFound />;
  }

  const categoryName = (await getCategoryById(event.id))?.name ?? "";

  return (
    <section className="space-y-4 py-5 md:py-10">
      <H3>Atualizar Evento</H3>
      <EventForm
        operation="Atualizar"
        id={event.id}
        thumbnail={event.thumbnail}
        title={event.title}
        description={event.description}
        reward={event.reward}
        startDate={event.startDate}
        endDate={event.endDate}
        registrationLink={event.registrationLink}
        registrationFee={event.registrationFee}
        communityInvitation={event.communityInvitation}
        isFeatured={event.isFeatured}
        categoryName={categoryName}
        organizerName={organizer?.name}
      />
      <Separator />
      <CodaPageForm eventId={event.id} />
    </section>
  );
};

export default UpdateEvent;
