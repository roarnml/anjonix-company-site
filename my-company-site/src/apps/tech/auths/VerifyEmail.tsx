import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/api";

export default function VerifyEmail() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const location = useLocation();

  // Run verification once when page loads
  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");

    if (!token) {
      setStatus("error");
      return;
    }

    const verifyEmail = async () => {
      try {
        await api.get(`/auth/verify?token=${token}`);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    };

    verifyEmail();
  }, [location.search]);

  // Auto-redirect after success
  useEffect(() => {
    if (status === "success") {
      const timeout = setTimeout(() => {
        window.location.href = "/tech/";
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  // Fancy visual feedback
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="p-10 rounded-2xl shadow-md bg-white text-center w-[90%] max-w-md">
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h1 className="text-xl font-semibold text-gray-700">
              Verifying your email...
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Please hold on while we check your token.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="text-2xl font-bold text-green-600">✅ Email Verified!</h1>
            <p className="text-gray-600 mt-2">
              You can now log in to your account.
            </p>
            <p className="text-gray-400 text-sm mt-4">
              Redirecting you to login...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-2xl font-bold text-red-600">
              ❌ Verification Failed
            </h1>
            <p className="text-gray-600 mt-2">
              The link may have expired or is invalid.
            </p>
            <a
              href="/tech/user/login"
              className="inline-block mt-4 text-blue-600 hover:underline"
            >
              Go to Login
            </a>
          </>
        )}
      </div>
    </div>
  );
}
