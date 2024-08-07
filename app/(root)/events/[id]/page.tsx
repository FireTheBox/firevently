import { Metadata } from "next";

import { CodaTabs } from "@/components/shared/coda-tabs";
import { EventSummary } from "@/components/shared/events/event-summary";
import { getEventById } from "@/lib/actions/event.actions";
import getSession from "@/lib/auth/get-session";

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

interface EventDetailsProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: EventDetailsProps): Promise<Metadata> {
  const id = params.id;

  const event = await getEventById(id);

  return {
    title: event.title,
    openGraph: {
      title: event.title,
      description: event.description,
      url: `https://app.firethebox.com/events/${id}`,
      siteName: "FireTheBox",
      images: [
        {
          width: 430,
          height: 530,
          url: event.imageUrl,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.description,
      images: [
        {
          width: 430,
          height: 530,
          url: event.imageUrl,
        },
      ],
      site: `https://app.firethebox.com/events/${id}`,
    },
  };
}

const EventDetails = async ({ params: { id } }: EventDetailsProps) => {
  const session = await getSession();
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
