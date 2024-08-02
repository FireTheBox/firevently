import { EventSummary } from "@/components/shared/events/event-summary";
import { CodaFrame } from "@/components/shared/frame/coda-frame";
import { Large } from "@/components/typography/large";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getEventById } from "@/lib/actions/event.actions";
import { auth } from "@/lib/auth";

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
      <Tabs defaultValue="details" className="mt-3">
        <TabsList className="space-x-2 overflow-x-scroll">
          <TabsTrigger value="details">
            <Large>Detalhes</Large>
          </TabsTrigger>
          <TabsTrigger value="projects">
            <Large>Projetos</Large>
          </TabsTrigger>
          <TabsTrigger value="timeline">
            <Large>Cronograma</Large>
          </TabsTrigger>
          <TabsTrigger value="participants">
            <Large>Participantes</Large>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <CodaFrame embedUrl="https://coda.io/embed/14yFFG5jBk/_suscY" />
        </TabsContent>
        <TabsContent value="projects">
          <CodaFrame embedUrl="https://coda.io/embed/YRo7SuUISP/_sut0a" />
        </TabsContent>
        <TabsContent value="timeline">
          <CodaFrame embedUrl="https://coda.io/embed/1VKyQ4-ZAs/_suu1E" />
        </TabsContent>
        <TabsContent value="participants">
          <CodaFrame embedUrl="https://coda.io/embed/OY5gXjYYxk/_sujj1" />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default EventDetails;
