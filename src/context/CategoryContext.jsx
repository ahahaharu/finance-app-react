import { createContext, useContext, useEffect, useState } from 'react';
import { createCategory } from '../models/category';

const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : [];
  });

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(expenses));
  }, [categories]);

  const addCategory = (data) => {
    const newCategory = createCategory(data);
    setCategories((prev) => [...prev, newCategory]);
  };

  const removeCategory = (id) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  };

  const value = {
    categories,
    addCategory,
    removeCategory,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useExpenses must be used within an CategoriesProvider');
  }
  return context;
}
