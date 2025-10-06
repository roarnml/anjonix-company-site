'use client';

import { useState } from 'react';
import { Button } from './ui/button';

interface SolutionRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

export default function SolutionRequestModal({
  isOpen,
  onClose,
  onSubmit,
}: SolutionRequestModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    request: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Request a Solution</h2>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="border p-2 w-full mb-3"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="border p-2 w-full mb-3"
          value={formData.email}
          onChange={handleChange}
        />
        <textarea
          name="request"
          placeholder="Describe your request..."
          className="border p-2 w-full mb-3"
          value={formData.request}
          onChange={handleChange}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="default" onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
}