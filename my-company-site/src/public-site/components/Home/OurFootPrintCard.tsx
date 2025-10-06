export default function OurFootprintCard() {
  const locations = [
    "Nigeria", "Ghana", "Kenya", "Rwanda", "South Africa"
  ];

  return (
    <div className="bg-gray-50 py-10 w-screen">
      <h2 className="text-2xl text-black font-bold text-center mb-6">Our Footprint</h2>
      <ul className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
        {locations.map((loc, idx) => (
          <li key={idx} className="bg-white p-3 shadow rounded-lg">{loc}</li>
        ))}
      </ul>
    </div>
  );
}
