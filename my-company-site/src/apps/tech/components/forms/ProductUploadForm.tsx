// ProductUploadForm.tsx
import { useState } from 'react';
import api from '../../api/api';

export default function ProductUploadForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    subcategory: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const files = (e.target as HTMLInputElement).files; // safe cast
    
    setFormData(prev => ({
      ...prev,
      [name]: files && files.length > 0 ? files[0] : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const form = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      form.append(key, val ?? ""); // replace null/undefined with ""
    });

    await api.post("products/", form, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} placeholder="Product Name" />
      <textarea name="description" onChange={handleChange} placeholder="Description" />
      <input type="number" name="price" onChange={handleChange} placeholder="Price" />
      <input name="subcategory" onChange={handleChange} placeholder="Subcategory ID" />
      <input type="file" name="image" accept="image/*" onChange={handleChange} />
      <button type="submit">Upload Product</button>
    </form>
  );
}  

