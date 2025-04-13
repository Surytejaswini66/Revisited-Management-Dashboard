import React, { useState } from 'react';
import axios from 'axios';

const AddCategoryForm = ({ onCategoryAdded, categories }) => {
  const [name, setName] = useState('');
  const [itemCount, setItemCount] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure itemCount is a number
    const parsedItemCount = parseInt(itemCount, 10);

    // If itemCount is not a valid number, show an error
    if (isNaN(parsedItemCount)) {
      alert('Please enter a valid number for item count');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('itemCount', parsedItemCount);  // Ensure itemCount is a number
    formData.append('image', image);  // Image file for upload

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not logged in.');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Add the JWT token to the request header
        },
      });
      onCategoryAdded(response.data);  // Call the callback on successful category creation
    } catch (error) {
      console.error('Error adding category', error);
      alert('There was an error adding the category.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name (e.g., Summer Clothes)"
          required
        />
        <input
          type="number"
          value={itemCount}
          onChange={(e) => setItemCount(e.target.value)}
          placeholder="Item Count (e.g., 26)"
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}  // Handle file upload
          required
        />
        <button type="submit">Add Category</button>
      </form>

      <h3>Categories:</h3>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            <strong>{category.name}</strong> ({category.itemCount} items)
            {/* Optionally, you can display the image if you want */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddCategoryForm;
