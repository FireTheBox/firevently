interface H3Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function H3({ children, className, ...rest }: H3Props) {
  return (
    <h3
      className={`text-2xl font-semibold font-serif tracking-tight ${className}`}
      {...rest}
    >
      {children}
    </h3>
  );
}
