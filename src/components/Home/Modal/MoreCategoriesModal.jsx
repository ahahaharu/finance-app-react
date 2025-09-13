import { Modal } from 'antd';
import React, { useState } from 'react';
import CategoryItem from '../Category/CategoryItem';
import { CATEGORIES } from '../../../constants/expenseConstants';
import { Plus } from 'lucide-react';
import CreateCategoryModal from './CreateCategoryModal';
import { useCategories } from '../../../context/CategoryContext';

export default function MoreCategoriesModal({ title, isOpen, onCancel }) {
  const [createCategoryModalOpen, setCreateCategoryModalOpen] = useState(false);
  const { categories } = useCategories();

  return (
    <Modal title={title} open={isOpen} onCancel={onCancel} onOk={onCancel}>
      <div className="flex flex-wrap gap-3 justify-start">
        {categories.map((category) => (
          <CategoryItem key={category.name} category={category} />
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

      {createCategoryModalOpen && (
        <CreateCategoryModal
          title={'Create Category'}
          isOpen={createCategoryModalOpen}
          onCancel={() => setCreateCategoryModalOpen(false)}
        />
      )}
    </Modal>
  );
}
