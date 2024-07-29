interface H2Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function H2({ children, className, ...rest }: H2Props) {
  return (
    <h2
      className={`scroll-m-20 border-b pb-2 text-3xl font-semibold font-serif tracking-tight first:mt-0 ${className}`}
      {...rest}
    >
      {children}
    </h2>
  );
}
