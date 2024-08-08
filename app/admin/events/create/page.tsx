import NotFound from "@/app/not-found";
import { EventForm } from "@/components/shared/event-form";
import { H3 } from "@/components/typography/h3";
import { Separator } from "@/components/ui/separator";
import getSession from "@/lib/auth/get-session";
import { isAdmin } from "@/lib/session";

const CreateEvent = async () => {
  const session = await getSession();

  if (!isAdmin(session)) {
    return <NotFound />;
  }

  return (
    <section className="space-y-4 py-5 md:py-10">
      <H3>Criar Evento</H3>
      <Separator />
      <EventForm operation="Criar" />
    </section>
  );
};

export default CreateEvent;
