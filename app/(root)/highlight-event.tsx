import { Muted } from "@/components/typography/muted";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { EventFeatures } from "./event-features";
import { EventThumbnail } from "./event-thumbnail";

export const HighlightEvent = () => {
  return (
    <div className="col-span-3 w-full flex items-end bg-primary/5 rounded-lg p-8">
      <Card className="border-none bg-transparent">
        <CardHeader>
          <CardTitle>Garagem de Startups 2024</CardTitle>
        </CardHeader>
        <CardContent>
          <Muted>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Muted>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-10">
          <Button asChild size={"lg"}>
            <Link href={"/#events"}>Participar</Link>
          </Button>
          <EventFeatures
            projects={25}
            participants={120}
            views={552}
            likes={641}
          />
        </CardFooter>
      </Card>
      <EventThumbnail
        name="Garagem de Startups 2024"
        price={0.0}
        startAt={new Date(new Date().getTime() + 12 * 3600 * 1000)}
      />
    </div>
  );
};
