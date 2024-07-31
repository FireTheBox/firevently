import { EventSummary } from "@/components/shared/events/event-summary";
import { CodaFrame } from "@/components/shared/frame/coda-frame";
import { Large } from "@/components/typography/large";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EventDetails {
  params: {
    id: string;
  };
}

const EventDetails = async ({ params: { id } }: EventDetails) => {
  // const event = await getEventById(id);

  return (
    <>
      <EventSummary />
      <Tabs defaultValue="details" className="mt-3">
        <TabsList>
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
          <CodaFrame embedUrl="https://coda.io/embed/pwJRZ9Cnd3/_suQky" />
        </TabsContent>
        <TabsContent value="projects">
          <CodaFrame embedUrl="https://coda.io/embed/pwJRZ9Cnd3/_suQky" />
        </TabsContent>
        <TabsContent value="timeline">
          <CodaFrame embedUrl="https://coda.io/embed/pwJRZ9Cnd3/_suQky" />
        </TabsContent>
        <TabsContent value="participants">
          <CodaFrame embedUrl="https://coda.io/embed/pwJRZ9Cnd3/_suQky" />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default EventDetails;
