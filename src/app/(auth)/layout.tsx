export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="h-screen flex-center bg-slate-100 font-palanquin">
        {children}
      </div>
    </>
  );
}
