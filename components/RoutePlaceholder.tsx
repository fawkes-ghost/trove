// Scaffold placeholder: renders only the route name.
export function RoutePlaceholder({ route }: { route: string }) {
  return (
    <main className="page min-h-[60svh] font-mono text-sm">
      <p>{route}</p>
    </main>
  );
}
