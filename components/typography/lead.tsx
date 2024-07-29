interface LeadProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function Lead({ children, className, ...rest }: LeadProps) {
  return (
    <p
      className={`text-xl font-sans text-muted-foreground ${className}`}
      {...rest}
    >
      {children}
    </p>
  );
}
