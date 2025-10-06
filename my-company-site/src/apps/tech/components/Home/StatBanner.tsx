import { useEffect, useState } from "react";

function Counter({ target, duration }: { target: number; duration: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 20);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count.toLocaleString()}</span>;
}

export default function StatsBanner() {
  return (
    <section className="bg-white py-10 text-gray-700 border-t border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="space-y-1">
          <p className="text-3xl font-bold text-blue-600">
            <Counter target={40} duration={1000} />+
          </p>
          <p className="text-sm font-medium">Schools Trust Us</p>
        </div>

        <div className="space-y-1">
          <p className="text-3xl font-bold text-green-600">
            <Counter target={10000} duration={1000} />+
          </p>
          <p className="text-sm font-medium">Students Reached</p>
        </div>

        <div className="space-y-1">
          <p className="text-3xl font-bold text-purple-600">
            <Counter target={10} duration={1000} />+
          </p>
          <p className="text-sm font-medium">Regions in Nigeria</p>
        </div>
      </div>
    </section>
  );
}
