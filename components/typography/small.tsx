import { cn } from "@/lib/utils";

interface SmallProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function Small({ children, className, ...rest }: SmallProps) {
  return (
    <small className={cn(`text-sm leading-none`, className)} {...rest}>
      {children}
    </small>
  );
}
