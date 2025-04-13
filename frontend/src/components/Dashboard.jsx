import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar'; // adjust path if needed

const Dashboard = ({ categories, setSelectedCategoryId }) => {
  console.log(categories); // Check if this logs the correct categories

  const navigate = useNavigate();
  const handleEdit = (id) => {
    setSelectedCategoryId(id);
    navigate(`/edit-category/${id}`);
  };

  const handleAddCategory = () => {
    navigate('/add-category');
  };

  return (
    <SideBar>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Clothing Categories</h1>
          <button
            onClick={handleAddCategory}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Category
          </button>
        </div>

        {categories?.length === 0 ? (
          <p className="text-gray-500">No categories found. Start by adding one!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories?.map((category) => {
              console.log(category);  // Log each category to verify its structure
              return (
                <div
                  key={category._id}
                  className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center text-center"
                >
                  <img
                    src={category.imageUrl || category.image} // Ensure you access the correct image
                    alt={category.name}
                    className="w-full h-40 object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <p className="text-gray-500">
                    {category.itemCount} item{category.itemCount !== 1 ? "s" : ""}
                  </p>
                  <button
                    onClick={() => handleEdit(category._id)}
                    className="mt-4 bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded-lg transition"
                  >
                    Edit
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </SideBar>
  );
};
 export default Dashboard