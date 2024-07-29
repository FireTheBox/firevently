interface PProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export function P({ children, className, ...rest }: PProps) {
  return <p className={`leading-7 [&:not(:first-child)]:mt-6 font-sans ${className}`} {...rest}>{children}</p>;
}
