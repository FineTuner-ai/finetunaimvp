
import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { RagCategoryTabs } from '@/components/rag/RagCategoryTabs';
import { RagModelCard } from '@/components/rag/RagModelCard';
import { NewRagModal } from '@/components/rag/NewRagModal';
import { Plus } from 'lucide-react';

const categories = [
  { id: 'text-to-text', label: 'Text-to-text' },
  { id: 'embeddings', label: 'Embeddings' },
  { id: 'text-to-image', label: 'Text-to-image' },
];

const models = [
  { id: 1, title: 'Meta-Llama-3.1-Nemotrn-70B-Instruct-HF', category: 'Text-to-text' },
  { id: 2, title: 'DeepSeek-V3-0324', category: 'Embeddings' },
  { id: 3, title: 'DeepSeek-V3', category: 'Text-to-image' },
  { id: 4, title: 'Llama-3.3-70B-Instruct', category: 'Text-to-text' },
  { id: 5, title: 'Qwen2.5-Coder-7B', category: 'Text-to-text' },
  { id: 6, title: 'Gemma-2-2b-it', category: 'Text-to-text' },
  { id: 7, title: 'FineTunAI model 1', category: 'Text-to-text' },
  { id: 8, title: 'FineTunAI model 2', category: 'Embeddings' },
  { id: 9, title: 'FineTunAI model 3', category: 'Text-to-image' },
];

const RagPage = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredModels = models.filter(
    (model) => model.category.toLowerCase() === activeCategory.replace('-', '-')
  );

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AutoRAG</h1>
        <p className="text-gray-400">Deploy RAG pipelines with your models</p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <RagCategoryTabs
          categories={categories}
          onChange={setActiveCategory}
        />
        <button
          className="finetun-btn-primary flex items-center"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={18} className="mr-2" />
          New RAG Pipeline
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model) => (
          <RagModelCard
            key={model.id}
            title={model.title}
            category={model.category}
            onClick={() => setIsModalOpen(true)}
          />
        ))}
      </div>

      <NewRagModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </AppLayout>
  );
};

export default RagPage;
