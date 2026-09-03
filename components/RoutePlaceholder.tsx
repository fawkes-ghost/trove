// Scaffold placeholder: renders only the route name.
export function RoutePlaceholder({ route }: { route: string }) {
  return (
    <main className="min-h-[60svh] px-6 pt-28 pb-16 font-mono text-sm">
      <p>{route}</p>
    </main>
  );
}
