import { useNavigate } from 'react-router-dom';
import { DealCard } from '@/components/dashboard/DealCard';
import { AddDealCard } from '@/components/dashboard/AddDealCard';

export function DealsList({ deals }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {deals.map(deal => (
        <DealCard key={deal.id} deal={deal} />
      ))}
      <AddDealCard />
    </div>
  );
}