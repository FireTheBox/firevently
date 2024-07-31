interface SmallProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function Small({ children, className, ...rest }: SmallProps) {
    return (
      <small className={`text-sm font-medium font-sans leading-none ${className}`} {...rest}>{children}</small>
    )
  }
  