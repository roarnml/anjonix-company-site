// Submenu.tsx
import InfoCard from "../../components/InfoCard";
import type { Card } from "../../types/card";

interface SubmenuProps {
  submenuTitle: string;
  cards: Card[];
}

export default function Submenu({ submenuTitle, cards }: SubmenuProps) {
  return (
    <main className="px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">{submenuTitle}</h1>
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card, idx) => (
          <InfoCard key={idx} {...card} />
        ))}
      </div>
    </main>
  );
}
