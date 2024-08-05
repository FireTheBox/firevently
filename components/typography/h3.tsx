import { baloo } from "@/app/fonts";
import { cn } from "@/lib/utils";

interface H3Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function H3({ children, className, ...rest }: H3Props) {
  return (
    <h3
      className={cn(`${baloo.className} text-2xl font-medium tracking-tight`, className)}
      {...rest}
    >
      {children}
    </h3>
  );
}
