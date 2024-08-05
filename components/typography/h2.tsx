import { baloo } from "@/app/fonts";
import { cn } from "@/lib/utils";

interface H2Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function H2({ children, className, ...rest }: H2Props) {
  return (
    <h2
      className={cn(`${baloo.className} text-3xl font-semibold`, className)}
      {...rest}
    >
      {children}
    </h2>
  );
}
