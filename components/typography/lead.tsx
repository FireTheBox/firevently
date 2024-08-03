interface LeadProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function Lead({ children, className, ...rest }: LeadProps) {
  return (
    <p
      className={`font-sans text-xl text-muted-foreground ${className}`}
      {...rest}
    >
      {children}
    </p>
  );
}
