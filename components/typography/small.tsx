interface SmallProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function Small({ children, className, ...rest }: SmallProps) {
    return (
      <small className={`font-sans text-sm font-medium leading-none ${className}`} {...rest}>{children}</small>
    )
  }
  