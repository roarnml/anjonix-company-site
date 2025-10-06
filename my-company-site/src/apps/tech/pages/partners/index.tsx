// /src/pages/partners/index.tsx
import EcommerceLayout from '../../components/Layouts/EcommerceLayout';
import VendorCard from '../../components/VendorCard';
import partnersData from '../../data/partners.json';

export default function PartnersPage() {
  return (
    <EcommerceLayout title="Our Partners">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {partnersData.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </EcommerceLayout>
  );
}
