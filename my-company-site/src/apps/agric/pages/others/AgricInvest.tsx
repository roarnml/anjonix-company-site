/*import React from "react";
import { useNavigate } from "react-router-dom";
import  Card, { CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

const investmentPlans = [
  {
    id: "1-acre",
    title: "1 Acre + 60 Palm Trees",
    price: "₦1,700,000",
    deposit: "₦850,000",
    path: "/plans/1-acre",
  },
  {
    id: "2-acres",
    title: "2 Acres + 120 Palm Trees",
    price: "₦3,400,000",
    deposit: "₦1,700,000",
    path: "/plans/2-acres",
  },
  {
    id: "3-acres",
    title: "3 Acres + 180 Palm Trees",
    price: "₦5,100,000",
    deposit: "₦2,550,000",
    path: "/plans/3-acres",
  },
  {
    id: "4-acres",
    title: "4 Acres + 240 Palm Trees",
    price: "₦6,800,000",
    deposit: "₦3,400,000",
    path: "/plans/4-acres",
  },
];

export default function AgricInvestmentPlans() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-gradient-to-br from-green-50 to-green-100 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-green-700 mb-4">
          Agric Investment Plans
        </h2>
        <p className="text-lg text-gray-600">
          Start your journey into palm kernel plantation with flexible plans.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {investmentPlans.map((plan) => (
          <Card
            key={plan.id}
            className="rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer"
          >
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-bold text-green-700 mb-2">
                  {plan.title}
                </h3>
                <p className="text-lg text-gray-700 font-semibold">
                  Total Price: {plan.price}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Initial Deposit: {plan.deposit}
                </p>
              </div>
              <Button
                onClick={() => navigate(plan.path)}
                className="bg-green-600 hover:bg-green-700 text-white rounded-xl mt-4"
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
*/

//import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card, { CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

const basePlans = [
  {
    id: "1-acre",
    title: "1 Acre + 60 Palm Trees",
    price: 1700000,
    deposit: 850000,
    path: "/plans/1-acre",
  },
  {
    id: "2-acres",
    title: "2 Acres + 120 Palm Trees",
    price: 3400000,
    deposit: 1700000,
    path: "/plans/2-acres",
  },
  {
    id: "3-acres",
    title: "3 Acres + 180 Palm Trees",
    price: 5100000,
    deposit: 2550000,
    path: "/plans/3-acres",
  },
  {
    id: "4-acres",
    title: "4 Acres + 240 Palm Trees",
    price: 6800000,
    deposit: 3400000,
    path: "/plans/4-acres",
  },
];

export default function AgricInvestmentPlans() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if promo is active
  const searchParams = new URLSearchParams(location.search);
  const promoActive = searchParams.get("promo") === "1";

  // Apply discount if promo
  const discountRate = 0.1; // 10% off
  const plans = basePlans.map((plan) => {
    if (!promoActive) return plan;
    return {
      ...plan,
      price: plan.price * (1 - discountRate),
      deposit: plan.deposit * (1 - discountRate),
    };
  });

  return (
    <section className="w-full bg-gradient-to-br from-green-50 to-green-100 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-green-700 mb-4">
          Agric Investment Plans
        </h2>
        <p className="text-lg text-gray-600">
          {promoActive
            ? "Special Promo! Discounted prices available for a limited time."
            : "Start your journey into palm kernel plantation with flexible plans."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className="rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer"
          >
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-bold text-green-700 mb-2">
                  {plan.title}
                </h3>
                <p className="text-lg text-gray-700 font-semibold">
                  Total Price: ₦{plan.price.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Initial Deposit: ₦{plan.deposit.toLocaleString()}
                </p>
              </div>
              <Button
                onClick={() => navigate(plan.path)}
                className="bg-green-600 hover:bg-green-700 text-white rounded-xl mt-4"
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
