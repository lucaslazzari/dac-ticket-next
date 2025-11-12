// app/(app)/customers/[id]/page.tsx
import DetailsPage from '@/modules/customers/pages/detailsPage';
import { notFound } from 'next/navigation';

type ParamsShape = { id: string } | Promise<{ id: string }>;

export default async function Page({ params }: { params: ParamsShape }) {
  // "Unwrap" params (resolve Promise if necessário)
  const { id } = (await params) as { id: string };

  const customerId = Number(id);
  if (Number.isNaN(customerId)) {
    // retorna 404 server-side se id inválido
    notFound();
  }

  return <DetailsPage customerId={customerId} />;
}