export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="container min-h-screen flex-1">{children}</main>;
}
