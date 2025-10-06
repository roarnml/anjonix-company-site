import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";

const OrganizationKYC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Destructure state from signup navigation
  const state = location.state as {
    orgName?: string;
    allowedDomain?: string;
    category?: string;
    email?: string;
    role?: string;
  };

  const { orgName: initialOrgName, allowedDomain: initialDomain, email: initialEmail, category: initialCategory, role } = state || {};

  const [step, setStep] = useState(1);
  const [orgName, setOrgName] = useState(initialOrgName || "");
  const [allowedDomain, setAllowedDomain] = useState(initialDomain || "");
  const [contactEmail, setContactEmail] = useState(initialEmail || "");
  const [category ] = useState(initialCategory || "");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await api.post("/organization/kyc", {
        orgName,
        allowedDomain,
        contactEmail,
        category,
        address,
        phone,
        website,
      });
      alert(res.data.message || "Organization KYC completed!");
      navigate(`/tech/user/${category}/${role}`); // redirect to dashboard
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to submit KYC");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Organization KYC</h2>

      {/* Stepper Indicator */}
      <div className="flex justify-between mb-6">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`w-1/3 text-center ${step === s ? "font-bold" : "text-gray-400"}`}>
            Step {s}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="space-y-4">
          <input
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder="Organization Name"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={allowedDomain}
            onChange={(e) => setAllowedDomain(e.target.value)}
            placeholder="Allowed Domain"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="Contact Email"
            required
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end">
            <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded">
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Contact Info */}
      {step === 2 && (
        <div className="space-y-4">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Organization Address"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="Website"
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-between">
            <button onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded">
              Back
            </button>
            <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded">
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review & Submit */}
      {step === 3 && (
        <div className="space-y-4">
          <p><strong>Organization Name:</strong> {orgName}</p>
          <p><strong>Allowed Domain:</strong> {allowedDomain}</p>
          <p><strong>Contact Email:</strong> {contactEmail}</p>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Website:</strong> {website}</p>

          <div className="flex justify-between">
            <button onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded">
              Back
            </button>
            <button
              onClick={handleSubmit}
              className={`px-4 py-2 bg-green-500 text-white rounded ${loading ? "opacity-50" : ""}`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit KYC"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationKYC;
