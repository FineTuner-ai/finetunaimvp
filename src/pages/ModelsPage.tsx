
import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { ModelCard } from '@/components/models/ModelCard';
import { NewModelModal } from '@/components/models/NewModelModal';
import { ModelCategoryTabs } from '@/components/models/ModelCategoryTabs';
import { Plus } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Models' },
  { id: 'llm', label: 'LLMs' },
  { id: 'vision', label: 'Vision' },
  { id: 'embeddings', label: 'Embeddings' },
];

const models = [
  { id: 1, title: 'Meta-Llama-3.1-Nemotrn-70B-Instruct-HF', category: 'LLMs', status: 'Ready' },
  { id: 2, title: 'DeepSeek-V3-0324', category: 'Embeddings', status: 'Training' },
  { id: 3, title: 'DALL-E 3', category: 'Vision', status: 'Ready' },
  { id: 4, title: 'Llama-3.3-70B-Instruct', category: 'LLMs', status: 'Ready' },
  { id: 5, title: 'Qwen2.5-Coder-7B', category: 'LLMs', status: 'Ready' },
  { id: 6, title: 'Gemma-2-2b-it', category: 'LLMs', status: 'Fine-tuning' },
  { id: 7, title: 'FineTunAI Vision Model', category: 'Vision', status: 'Ready' },
  { id: 8, title: 'FineTunAI Embedding Model', category: 'Embeddings', status: 'Ready' },
  { id: 9, title: 'Custom GPT-4o Model', category: 'LLMs', status: 'Pending' },
];

const ModelsPage = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredModels = activeCategory === 'all' 
    ? models 
    : models.filter(model => model.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Models</h1>
        <p className="text-gray-400">Manage and train your AI models</p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <ModelCategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />
        <button
          className="finetun-btn-primary flex items-center"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={18} className="mr-2" />
          New Model
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model) => (
          <ModelCard
            key={model.id}
            title={model.title}
            category={model.category}
            status={model.status}
          />
        ))}
      </div>

      <NewModelModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </AppLayout>
  );
};

export default ModelsPage;
