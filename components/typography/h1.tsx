interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function H1({ children, className, ...rest }: H1Props) {
  return (
    <h1
      className={`scroll-m-20 text-4xl font-bold font-serif tracking-tight lg:text-5xl ${className}`}
      {...rest}
    >
      {children}
    </h1>
  );
}
