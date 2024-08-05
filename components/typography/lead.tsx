import { cn } from "@/lib/utils";

interface LeadProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function Lead({ children, className, ...rest }: LeadProps) {
  return (
    <p
      className={cn(`text-xl text-muted-foreground`, className)}
      {...rest}
    >
      {children}
    </p>
  );
}
