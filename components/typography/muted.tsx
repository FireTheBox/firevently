interface MutedProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function Muted({ children, className, ...rest }: MutedProps) {
  return (
    <p
      className={`text-sm font-sans text-muted-foreground ${className}`}
      {...rest}
    >
      {children}
    </p>
  );
}
