import { cn } from "@/lib/utils";

interface PProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function P({ children, className, ...rest }: PProps) {
  return (
    <p className={cn(`leading-7`, className)} {...rest}>
      {children}
    </p>
  );
}
