const team = [
  {
    name: "Daniel Akinyemi",
    role: "Founder & CTO",
    img: "/team/daniel.jpg"
  },
  {
    name: "Ada Obi",
    role: "Head of Education",
    img: "/team/ada.jpg"
  },
  {
    name: "Yusuf Bello",
    role: "Lead Agric Engineer",
    img: "/team/yusuf.jpg"
  }
];

export default function TeamCard() {
  return (
    <div className="py-10 px-6 bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">Meet the Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {team.map((member, idx) => (
          <div key={idx} className="text-center">
            <img src={member.img} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
            <h3 className="font-semibold text-lg">{member.name}</h3>
            <p className="text-sm text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
