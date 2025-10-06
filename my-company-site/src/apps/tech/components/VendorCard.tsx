'use client';

export interface VendorType {
  id: number;
  category: string;
  vendor: string;
  name: string;
  img: string;
  desc: string;
  spec: string;
  pricing: string;
}

interface VendorCardProps {
  vendor: VendorType;
}

export default function VendorCard({ vendor }: VendorCardProps) {
  return (
    <div className="border rounded-lg p-4 flex flex-col items-center text-center shadow-sm">
      <img
        src={vendor.img}
        alt={vendor.name}
        className="w-24 h-24 object-contain mb-3"
      />
      <h3 className="font-semibold">{vendor.name}</h3>
      <p className="text-sm text-gray-500 mb-2">{vendor.category}</p>
      <p className="text-sm">{vendor.desc}</p>
    </div>
  );
}
