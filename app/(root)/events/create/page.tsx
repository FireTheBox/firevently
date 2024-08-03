import { redirect } from "next/navigation";

import { EventForm } from "@/components/shared/event-form";
import { H3 } from "@/components/typography/h3";
import getSession from "@/lib/auth/get-session";

const CreateEvent = async () => {
  const session = await getSession();

  const userEmail = session?.user?.email as string;

  const allowedEmails = process.env.ALLOWED?.split(",");

  if (!allowedEmails || !allowedEmails.includes(userEmail)) {
    redirect("/");
  }

  return (
    <>
      <section className="bg-center py-5 md:py-10">
        <H3>Criar Evento</H3>
      </section>

      <div className="my-8">
        <EventForm type="Criar" userEmail={userEmail} />
      </div>
    </>
  );
};

export default CreateEvent;
