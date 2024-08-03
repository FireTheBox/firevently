interface H3Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function H3({ children, className, ...rest }: H3Props) {
  return (
    <h3
      className={`font-serif text-2xl font-semibold tracking-tight ${className}`}
      {...rest}
    >
      {children}
    </h3>
  );
}
