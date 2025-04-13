import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from 'axios';
import ErrorBoundary from './components/ErrorBoundary';
import AddCategoryForm from './components/AddCategoryForm';
import ProtectedRoute from "./components/ProtectedRoute";
import SideBar from "./components/SideBar";
import Products from "./components/Products";
import Customers from "./components/Customers";
import Reports from "./components/Reports";
import Coupons from "./components/Coupons";
import Inbox from "./components/Inbox";
import KnowledgeBase from "./components/KnowledgeBase";
import ProductUpdates from "./components/ProductUpdates";
import PersonalSettings from "./components/PersonalSettings";
import GlobalSettings from "./components/GlobalSettings";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import EditCategoryForm from "./components/EditCategoryForm";

const App = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        if (Array.isArray(response.data)) {
          setCategories(response.data);  // Update state with fetched categories
        } else {
          console.error("Expected an array but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchCategories();
  }, []);
  

  // This is the function you will pass down to AddCategoryForm
  const handleCategoryAdded = (newCategory) => {
    setCategories([...categories, newCategory]);
  };
  const handleCategoryUpdated = (updatedCategory) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category._id === updatedCategory._id ? updatedCategory : category
      )
    );
  };

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 🔒 Protected layout with SideBar */}
          <Route element={<ProtectedRoute />}>
            <Route element={<SideBar />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route
                path="/categories"
                element={<AddCategoryForm onCategoryAdded={handleCategoryAdded} categories={categories} />}
              />
             <Route
  path="/edit-category/:id"
  element={<EditCategoryForm onCategoryUpdated={handleCategoryUpdated} />}
/>
              
              <Route path="/customers" element={<Customers />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/coupons" element={<Coupons />} />
              <Route path="/inbox/requested" element={<Inbox />} />
              <Route path="/inbox/unread" element={<Inbox />} />
              <Route path="/inbox/all" element={<Inbox />} />
              <Route path="/info/knowledge-base" element={<KnowledgeBase />} />
              <Route path="/info/product-updates" element={<ProductUpdates />} />
              <Route path="/settings/personal" element={<PersonalSettings />} />
              <Route path="/settings/global" element={<GlobalSettings />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
