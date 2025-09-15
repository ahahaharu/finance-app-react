import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import CategoryItem from '../Category/CategoryItem';
import { CATEGORIES } from '../../../constants/expenseConstants';
import { MousePointer2, Pencil, Plus, Trash } from 'lucide-react';
import CreateCategoryModal from './CreateCategoryModal';
import { useCategories } from '../../../context/CategoryContext';

// TODO: добавить редактирование категорий

export default function MoreCategoriesModal({ title, isOpen, onCancel }) {
  const [createCategoryModalOpen, setCreateCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const { categories, removeCategory } = useCategories();

  function handleDeleteCategory() {
    const category = categories.find(
      (category) => category.name === selectedCategory
    );

    removeCategory(category.id);
    setSelectedCategory('');
  }

  function handleModalCancel() {
    setCreateCategoryModalOpen(false);
    setIsEditMode(false);
    setInitialData(null);
  }

  function handleEditCategory() {
    const category = categories.find(
      (category) => category.name === selectedCategory
    );

    setInitialData(category);
    setIsEditMode(true);
    setCreateCategoryModalOpen(true);
  }

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onCancel}
      onOk={onCancel}
      footer={null}
    >
      <div className="flex flex-wrap gap-3 justify-start">
        {categories.map((category) => (
          <CategoryItem
            key={category.name}
            category={category}
            isSelected={selectedCategory === category.name}
            onClick={() => setSelectedCategory(category.name)}
          />
        ))}
        <button
          type="button"
          className="flex flex-col items-center justify-center w-1/5 p-0.5 rounded cursor-pointer text-xs text-left hover:bg-sky-50 transition-all"
          style={{ color: '#6b7280' }}
          onClick={() => setCreateCategoryModalOpen(true)}
        >
          <Plus size={30} />
          <span className="text-center mt-1 w-full whitespace-nowrap overflow-hidden text-ellipsis">
            Create
          </span>
        </button>
      </div>
      <div className="mt-3 flex justify-end gap-3">
        <Button onClick={onCancel}>Cancel</Button>
        {selectedCategory ? (
          <>
            <Button
              onClick={handleDeleteCategory}
              danger
              icon={<Trash size={15} />}
            >
              Delete
            </Button>
            <Button onClick={handleEditCategory} icon={<Pencil size={15} />}>
              Edit
            </Button>
            <Button
              type="primary"
              onClick={onCancel}
              icon={<MousePointer2 size={15} />}
            >
              Select
            </Button>
          </>
        ) : (
          ''
        )}
      </div>

      {createCategoryModalOpen && (
        <CreateCategoryModal
          title={isEditMode ? 'Edit Category' : 'Create Category'}
          isOpen={createCategoryModalOpen}
          onCancel={handleModalCancel}
          isEditMode={isEditMode}
          initialData={initialData}
        />
      )}
    </Modal>
  );
}
