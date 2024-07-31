interface H2Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function H2({ children, className, ...rest }: H2Props) {
  return (
    <h2
      className={`text-3xl font-semibold font-serif ${className}`}
      {...rest}
    >
      {children}
    </h2>
  );
}
