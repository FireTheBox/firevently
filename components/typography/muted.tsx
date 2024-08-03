interface MutedProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function Muted({ children, className, ...rest }: MutedProps) {
  return (
    <p
      className={`font-sans text-sm text-muted-foreground ${className}`}
      {...rest}
    >
      {children}
    </p>
  );
}
