interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function H1({ children, className, ...rest }: H1Props) {
  return (
    <h1
      className={`scroll-m-20 text-3xl font-bold font-serif tracking-tight lg:text-4xl ${className}`}
      {...rest}
    >
      {children}
    </h1>
  );
}
