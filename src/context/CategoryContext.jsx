import { createContext, useContext, useEffect, useState } from 'react';
import { createCategory } from '../models/category';
import { CATEGORIES } from '../constants/expenseConstants';

const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      return JSON.parse(savedCategories);
    } else {
      const defaultCategories = CATEGORIES.map((cat) =>
        createCategory({
          name: cat.name,
          type: cat.type,
          icon: cat.icon,
          color: cat.color,
        })
      );
      localStorage.setItem('categories', JSON.stringify(defaultCategories));
      return defaultCategories;
    }
  });

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addCategory = (data) => {
    const newCategory = createCategory(data);
    setCategories((prev) => [...prev, newCategory]);
  };

  const editCategory = (id, newData) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id ? { ...category, ...newData } : category
      )
    );
  };

  const removeCategory = (id) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  };

  const getCategoryByName = (categoryName) => {
    return categories.find((category) => category.name === categoryName);
  };

  const value = {
    categories,
    addCategory,
    editCategory,
    removeCategory,
    getCategoryByName,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories must be used within an CategoriesProvider');
  }
  return context;
}
