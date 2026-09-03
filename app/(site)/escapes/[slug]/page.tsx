import { escape } from '@/config/prize';
import { RoutePlaceholder } from '@/components/RoutePlaceholder';

export function generateStaticParams() {
  return [{ slug: escape.slug }];
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <RoutePlaceholder route={`/escapes/${slug}`} />;
}
