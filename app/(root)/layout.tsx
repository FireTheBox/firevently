export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex-1 container mx-5 md:mx-0">
      {children}
    </main>
  );
}
