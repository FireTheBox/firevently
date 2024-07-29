export function P({ children }: { children: React.ReactNode }) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6 font-sans">{children}</p>;
}
