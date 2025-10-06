import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function OrderConfirmation() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/tech");
    }, 6000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      {/* Success Icon */}
      <CheckCircle className="text-green-500 w-20 h-20 mb-4" />

      {/* Thank You Message */}
      <h1 className="text-3xl font-bold mb-2 text-center">
        Thank You for Your Order!
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Your order has been placed successfully.  
        You will be redirected to the homepage shortly.
      </p>

      {/* Redirect Countdown Info */}
      <p className="text-sm text-gray-400 italic">
        Redirecting in 6 seconds...
      </p>
    </div>
  );
}
