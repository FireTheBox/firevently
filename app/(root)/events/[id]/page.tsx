import { CodaTabs } from "@/components/shared/coda-tabs";
import { EventSummary } from "@/components/shared/events/event-summary";
import { getEventById } from "@/lib/actions/event.actions";
import { auth } from "@/lib/auth";

const embeds = [
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
];

interface EventDetails {
  params: {
    id: string;
  };
}

const EventDetails = async ({ params: { id } }: EventDetails) => {
  const session = await auth();
  const event = await getEventById(id);

  const userEmail = session?.user?.email ?? undefined;

  return (
    <>
      <EventSummary event={event} email={userEmail} />
      <CodaTabs items={embeds} />
    </>
  );
};

export default EventDetails;
