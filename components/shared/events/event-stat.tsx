import { Muted } from "@/components/typography/muted";

import { Icon, IconName } from "../helper/icon";

interface StatProps {
  label: string;
  value: string;
  iconName: IconName;
}

export const Stat: React.FC<StatProps> = ({ label, value, iconName }) => {
  return (
    <div className="flex items-center">
      <Icon name={iconName} className="size-5 text-muted-foreground" />
      <Muted className="ml-2">
        {value} {label}
      </Muted>
    </div>
  );
};
