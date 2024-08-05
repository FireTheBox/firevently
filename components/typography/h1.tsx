import { baloo } from "@/app/fonts";
import { cn } from "@/lib/utils";

interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function H1({ children, className, ...rest }: H1Props) {
  return (
    <h1
      className={cn(
        `${baloo.className} text-3xl font-bold tracking-tight lg:text-4xl`,
        className
      )}
      {...rest}
    >
      {children}
    </h1>
  );
}
