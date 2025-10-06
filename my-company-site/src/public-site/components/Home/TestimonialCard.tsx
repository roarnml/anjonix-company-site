export default function TestimonialsCard() {
  const testimonials = [
    {
      name: "Grace U.",
      role: "School Principal",
      quote: "Anjonix transformed our school with their digital tools. Our students now learn better and faster."
    },
    {
      name: "Ahmed B.",
      role: "Farmer",
      quote: "Thanks to Anjonix's farm automation, I’ve doubled my harvest and reduced costs."
    }
  ];

  return (
    <div className="bg-white py-10 px-6 text-black">
      <h2 className="text-2xl font-bold text-center mb-6">What People Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t, idx) => (
          <div key={idx} className="p-4 border rounded-lg">
            <p className="italic text-gray-700">"{t.quote}"</p>
            <p className="mt-2 text-sm font-semibold text-blue-700">{t.name}, <span className="text-gray-500">{t.role}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}
