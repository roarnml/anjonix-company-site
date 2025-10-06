//import React from "react";
import Card from "../../components/ui/card";

interface CtaCardProps {
  title: string;
  description: string;
  buttonText: string;
  onClick?: () => void;
}

export default function CtaCard({ title, description, buttonText, onClick }: CtaCardProps) {
  return (
    <Card className="text-center border-t-4 border-green-600 shadow-lg">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">{title}</h2>
      <p className="text-gray-700 mb-6">{description}</p>
      <button
        onClick={onClick}
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        {buttonText}
      </button>
    </Card>
  );
}
