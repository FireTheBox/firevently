interface LargeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Large({ children, className, ...rest }: LargeProps) {
  return (
    <div className={`text-lg font-semibold font-sans ${className}`} {...rest}>
      {children}
    </div>
  );
}
