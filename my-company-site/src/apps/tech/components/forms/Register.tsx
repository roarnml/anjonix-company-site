// RegisterPage.tsx
import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', password: '', is_vendor: true });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value === "true" // convert string back to boolean
    }));
  };



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/auth/users/", form);
  };


  return (
    <form onSubmit={handleSubmit}>
      <input name="username" onChange={handleChange} placeholder="Username" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" />
      <select name="is_vendor" onChange={handleChange}>
        <option value="true">Vendor</option>
        <option value="false">Client</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}