import { EventForm } from "@/components/shared/event-form";
import { getEventById } from "@/lib/actions/event.actions";
import { auth } from "@/lib/auth";
import { getUserByEmail } from "@/lib/database/actions/get-user-by-email.action";
import { redirect } from "next/navigation";

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const session = await auth();

  const userEmail = session?.user?.email as string;
  const event = await getEventById(id);

  const user = await getUserByEmail({ email: userEmail });

  if (user?.userId !== event.organizer._id.toString()) {
    redirect("/");
  }

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Atualizar Evento
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm
          type="Atualizar"
          event={event}
          eventId={event._id}
          userEmail={userEmail}
        />
      </div>
    </>
  );
};

export default UpdateEvent;
