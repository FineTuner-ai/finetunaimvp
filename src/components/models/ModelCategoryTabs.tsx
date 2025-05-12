
import { useState, useEffect } from 'react';

type CategoryTab = {
  id: string;
  label: string;
};

type ModelCategoryTabsProps = {
  categories: CategoryTab[];
  activeCategory: string;
  onChange?: (categoryId: string) => void;
};

export const ModelCategoryTabs = ({ 
  categories, 
  activeCategory, 
  onChange 
}: ModelCategoryTabsProps) => {
  const [localActiveCategory, setLocalActiveCategory] = useState(activeCategory);

  useEffect(() => {
    setLocalActiveCategory(activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (categoryId: string) => {
    setLocalActiveCategory(categoryId);
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
            localActiveCategory === category.id
              ? 'text-finetun-purple font-medium'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => handleCategoryChange(category.id)}
        >
          {category.label}
          {localActiveCategory === category.id && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-finetun-purple" />
          )}
        </button>
      ))}
    </div>
  );
};
