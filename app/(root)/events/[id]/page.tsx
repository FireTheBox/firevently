import { ObjectId } from "mongodb";
import { Metadata } from "next";

import NotFound from "@/app/not-found";
import { CodaTabs } from "@/components/shared/coda-tabs";
import { EventSummary } from "@/components/shared/events/event-summary";
import getSession from "@/lib/auth/get-session";
import { getEventById } from "@/lib/event/event.service";

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

  if (!ObjectId.isValid(id)) {
    return {};
  }

  const event = await getEventById(id);

  if (!event) {
    return {};
  }

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
          url: event.thumbnail,
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
          url: event.thumbnail,
        },
      ],
      site: `https://app.firethebox.com/events/${id}`,
    },
  };
}

const EventDetails = async ({ params: { id } }: EventDetailsProps) => {
  const session = await getSession();
  const event = await getEventById(id);

  if (!event) {
    return <NotFound />;
  }

  return (
    <>
      <EventSummary event={event} session={session} />
      <CodaTabs items={embeds} />
    </>
  );
};

export default EventDetails;
