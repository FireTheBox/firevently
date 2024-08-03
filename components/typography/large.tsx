interface LargeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Large({ children, className, ...rest }: LargeProps) {
  return (
    <div className={`font-sans text-lg font-semibold ${className}`} {...rest}>
      {children}
    </div>
  );
}
