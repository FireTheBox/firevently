"use client";

import { EventForm } from "@/components/shared/event-form";
import { H3 } from "@/components/typography/h3";
import { useSession } from "next-auth/react";

const CreateEvent = () => {
  const { data } = useSession();

  const userEmail = data?.user?.email as string;

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <H3>Criar Evento</H3>
      </section>

      <div className="wrapper my-8">
        <EventForm userEmail={userEmail} type="Criar" />
      </div>
    </>
  );
};

export default CreateEvent;
