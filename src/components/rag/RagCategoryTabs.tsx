
import { useState } from 'react';

type CategoryTab = {
  id: string;
  label: string;
};

type RagCategoryTabsProps = {
  categories: CategoryTab[];
  onChange?: (categoryId: string) => void;
};

export const RagCategoryTabs = ({ categories, onChange }: RagCategoryTabsProps) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || '');

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (onChange) {
      onChange(categoryId);
    }
  };

  return (
    <div className="flex space-x-6 border-b border-finetun-dark-lighter mb-6">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`pb-3 px-1 relative ${
            activeCategory === category.id
              ? 'text-finetun-purple font-medium'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => handleCategoryChange(category.id)}
        >
          {category.label}
          {activeCategory === category.id && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-finetun-purple" />
          )}
        </button>
      ))}
    </div>
  );
};
