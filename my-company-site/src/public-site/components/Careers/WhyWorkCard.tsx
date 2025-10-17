// WhyWorkCardDiv.jsx


type Benefit = {
  title: string;
  subtitle: string;
  description: string;
};


type WhyWorkCardDivProps = {
  benefits: Benefit[];
};


export default function WhyWorkCardDiv({ benefits }: WhyWorkCardDivProps) {
  return (
    <div className="relative max-w-6xl mx-auto mb-16 px-6">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10 text-center">
        Why Work at Anjonix?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="relative bg-white rounded-3xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            {/* Optional techy overlay */}
            <div
              className="absolute inset-0 opacity-10 bg-cover bg-center rounded-3xl"
              style={{
                backgroundImage:
                  "url('https://cdn.pixabay.com/photo/2022/02/28/08/06/technology-7039491_1280.jpg')",
              }}
            ></div>
            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{benefit.title}</h3>
              <h4 className="text-md font-medium text-gray-700 mb-3">{benefit.subtitle}</h4>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
