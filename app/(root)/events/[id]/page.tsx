import { CodaTabs } from "@/components/shared/coda-tabs";
import { EventSummary } from "@/components/shared/events/event-summary";
import { getEventById } from "@/lib/actions/event.actions";
import getSession from "@/lib/auth/get-session";

const embeds = {
  garagem: [
    {
      key: "details",
      label: "Detalhes",
      url: "https://coda.io/embed/14yFFG5jBk/_suscY",
    },
    {
      key: "projects",
      label: "Projetos",
      url: "https://coda.io/embed/YRo7SuUISP/_sut0a",
    },
    {
      key: "timeline",
      label: "Cronograma",
      url: "https://coda.io/embed/1VKyQ4-ZAs/_suu1E",
    },
    {
      key: "participants",
      label: "Participantes",
      url: "https://coda.io/embed/OY5gXjYYxk/_sujj1",
    },
  ],
  riw24: [
    {
      key: "details",
      label: "Detalhes",
      url: "https://coda.io/embed/0L-rWZPK2w/_suscY",
    },
    {
      key: "projects",
      label: "Projetos",
      url: "https://coda.io/embed/nXHOTOYHKh/_sut0a",
    },
    {
      key: "timeline",
      label: "Cronograma",
      url: "https://coda.io/embed/KhDGlkcKhW/_suu1E",
    },
    {
      key: "participants",
      label: "Participantes",
      url: "https://coda.io/embed/EmC_WBrbTO/_sujj1",
    },
  ]
};

interface EventDetails {
  params: {
    id: string;
  };
}

const EventDetails = async ({ params: { id } }: EventDetails) => {
  const session = await getSession();
  const event = await getEventById(id);

  const userEmail = session?.user?.email ?? undefined;

  return (
    <>
      <EventSummary event={event} email={userEmail} />
      {id === "66b3bdfa0d97c5415ee6c2be" ? (
        <CodaTabs items={embeds.riw24} />
      ) : (
        <CodaTabs items={embeds.garagem} />
      )}
    </>
  );
};

export default EventDetails;
