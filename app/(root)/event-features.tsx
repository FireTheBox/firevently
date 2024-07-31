import { Large } from "@/components/typography/large";
import { Muted } from "@/components/typography/muted";
import { P } from "@/components/typography/p";

interface EventFeaturesProps {
  projects: number;
  participants: number;
  views: number;
  likes: number;
}

export const EventFeatures = ({
  projects,
  participants,
  views,
  likes,
}: EventFeaturesProps) => {
  return (
    <ul className="flex border border-secondary-foreground rounded-md">
      <li className="text-center px-4 py-2 border-r border-secondary-foreground">
        <Large>{projects}</Large>
        <Muted>Projetos</Muted>
      </li>
      <li className="text-center px-4 py-2 border-r border-secondary-foreground">
        <Large>{participants}</Large>
        <Muted>Participantes</Muted>
      </li>
      <li className="text-center px-4 py-2 border-r border-secondary-foreground">
        <Large>{views}</Large>
        <Muted>Visualizações</Muted>
      </li>
      <li className="text-center px-4 py-2">
        <Large>{likes}</Large>
        <Muted>Likes</Muted>
      </li>
    </ul>
  );
};
