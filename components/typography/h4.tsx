interface H4Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function H4({ children, className, ...rest }: H4Props) {
  return (
    <h4
      className={`font-serif text-xl font-semibold tracking-tight ${className}`}
      {...rest}
    >
      {children}
    </h4>
  );
}
