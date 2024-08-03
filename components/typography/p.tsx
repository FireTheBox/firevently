interface PProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export function P({ children, className, ...rest }: PProps) {
  return <p className={`font-sans leading-7 ${className}`} {...rest}>{children}</p>;
}
