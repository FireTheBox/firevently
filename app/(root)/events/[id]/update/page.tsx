import { redirect } from "next/navigation";

import { EventForm } from "@/components/shared/event-form";
import { getEventById } from "@/lib/actions/event.actions";
import getSession from "@/lib/auth/get-session";
import { handleError } from "@/lib/utils";

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const session = await getSession();

  if (!session || !session.user) {
    redirect("/");
  }

  const { id: userId, email } = session.user;

  if (!userId || !email) {
    redirect("/");
  }

  let event;

  try {
    const event = await getEventById(id);

    if (userId !== event.organizer._id.toString()) {
      redirect("/");
    }
  } catch (error) {
    handleError(error);
    redirect("/");
  }

  return (
    <>
      <section className="bg-cover bg-center py-5 md:py-10">
        <h3 className="text-center sm:text-left">Atualizar Evento</h3>
      </section>

      <div className="my-8">
        <EventForm type="Atualizar" event={event} userEmail={email} />
      </div>
    </>
  );
};

export default UpdateEvent;
