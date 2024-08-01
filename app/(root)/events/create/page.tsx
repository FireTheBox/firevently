import { EventForm } from "@/components/shared/event-form";
import { H3 } from "@/components/typography/h3";
import { auth } from "@/lib/auth";
import { Suspense } from "react";

const CreateEvent = async () => {
  const session = await auth();

  const userEmail = session?.user?.email as string;

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <H3>Criar Evento</H3>
      </section>

      <div className="wrapper my-8">
        <Suspense fallback={"Loading..."}>
          <EventForm type="Criar" userEmail={userEmail} />
        </Suspense>
      </div>
    </>
  );
};

export default CreateEvent;
