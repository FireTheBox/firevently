import { cn } from "@/lib/utils";

interface LargeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Large({ children, className, ...rest }: LargeProps) {
  return (
    <div className={cn(`text-lg`, className)} {...rest}>
      {children}
    </div>
  );
}
