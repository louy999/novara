export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gradient-to-r from-[#e6e9f0] to-[#eef1f5] h-full min-h-screen">
      <div className="w-full">{children}</div>
    </div>
  );
}
