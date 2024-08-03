import { P } from "@/components/typography/p";
import { Separator } from "@/components/ui/separator";

export function AuthMethodSeparator() {
  return (
    <div className="flex items-center gap-1 md:gap-4">
      <Separator className="flex-1" />
      <P>ou com e-mail</P>
      <Separator className="flex-1" />
    </div>
  );
}
