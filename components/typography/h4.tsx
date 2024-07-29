interface H4Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function H4({ children, className, ...rest }: H4Props) {
  return (
    <h4
      className={`scroll-m-20 text-xl font-semibold font-serif tracking-tight ${className}`}
      {...rest}
    >
      {children}
    </h4>
  );
}
