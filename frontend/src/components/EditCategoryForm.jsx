import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditCategoryForm = ({ categoryId, onCategoryUpdated }) => {
  const [name, setName] = useState('');
  const [itemCount, setItemCount] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`/api/categories/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT Token for authentication
          },
        });
        const { name, itemCount, imageUrl } = response.data;
        setName(name);
        setItemCount(itemCount);
        setImage(imageUrl);  // Set the image URL to preview (if available)
      } catch (error) {
        console.error('Error fetching category details', error);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('itemCount', itemCount);
    if (image instanceof File) formData.append('image', image); // Upload new image only if it's a file

    try {
      const response = await axios.put(`/api/categories/${categoryId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT token
        },
      });
      onCategoryUpdated(response.data);  // Notify parent about the updated category
    } catch (error) {
      console.error('Error updating category', error);
    }
  };

  return (
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
      {image && typeof image === 'string' && (
        <div>
          <img src={image} alt="Category" width="100" height="100" />
          <p>Current Image</p>
        </div>
      )}
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}  // Handle file upload
      />
      <button type="submit">Edit Category</button>
    </form>
  );
};

export default EditCategoryForm;
