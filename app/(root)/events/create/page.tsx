import { EventForm } from "@/components/shared/event-form";
import { H3 } from "@/components/typography/h3";
import { auth } from "@/lib/auth";

const CreateEvent = async () => {
  const session = await auth();

  const userId = session?.user?.id ?? "";

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <H3>Criar Evento</H3>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={userId} type="Criar" />
      </div>
    </>
  );
};

export default CreateEvent;
