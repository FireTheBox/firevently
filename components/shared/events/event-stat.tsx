import { Muted } from "@/components/typography/muted";
import { Icon, IconName } from "../helper/icon";

interface StatProps {
  label: string;
  value: string;
  iconName: IconName;
}

const Stat: React.FC<StatProps> = ({ label, value, iconName }) => {
  return (
    <div className="flex items-center">
      <Icon name={iconName} className="size-5 text-muted-foreground" />
      <Muted className="ml-2">
        {value} {label}
      </Muted>
    </div>
  );
};

export const EventStats: React.FC = () => {
  return (
    <div className="h-5 flex justify-between items-start">
      <Stat label="Projetos" value="125" iconName="circle-play" />
      <Stat label="Participantes" value="145" iconName="users" />
      <Stat label="Visualizações" value="356" iconName="eye" />
      <Stat label="Likes" value="1.2k" iconName="heart" />
    </div>
  );
};
