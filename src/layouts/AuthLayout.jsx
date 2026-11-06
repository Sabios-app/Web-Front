export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-2/5 bg-verde-petroleo text-white p-9">
        Painel verde
      </aside>
      <main className="flex-1 bg-creme p-9">
        {children}
      </main>
    </div>
  );
}