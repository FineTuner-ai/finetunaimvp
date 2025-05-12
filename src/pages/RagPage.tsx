
import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { RagCategoryTabs } from '@/components/rag/RagCategoryTabs';
import { RagModelCard } from '@/components/rag/RagModelCard';
import { NewRagModal } from '@/components/rag/NewRagModal';
import { Plus, Database, HardDrive, Activity, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const categories = [
  { id: 'text-to-text', label: 'Text-to-text' },
  { id: 'embeddings', label: 'Embeddings' },
  { id: 'text-to-image', label: 'Text-to-image' },
];

const models = [
  { id: 1, title: 'Meta-Llama-3.1-Nemotrn-70B-Instruct-HF', category: 'Text-to-text', documentsCount: 128, lastUpdated: '2 days ago' },
  { id: 2, title: 'DeepSeek-V3-0324', category: 'Embeddings', documentsCount: 56, lastUpdated: '5 hours ago' },
  { id: 3, title: 'DeepSeek-V3', category: 'Text-to-image', documentsCount: 42, lastUpdated: '1 week ago' },
  { id: 4, title: 'Llama-3.3-70B-Instruct', category: 'Text-to-text', documentsCount: 214, lastUpdated: 'Just now' },
  { id: 5, title: 'Qwen2.5-Coder-7B', category: 'Text-to-text', documentsCount: 89, lastUpdated: '3 days ago' },
  { id: 6, title: 'Gemma-2-2b-it', category: 'Text-to-text', documentsCount: 37, lastUpdated: '2 weeks ago' },
  { id: 7, title: 'FineTunAI model 1', category: 'Text-to-text', documentsCount: 156, lastUpdated: '1 day ago' },
  { id: 8, title: 'FineTunAI model 2', category: 'Embeddings', documentsCount: 64, lastUpdated: '4 days ago' },
  { id: 9, title: 'FineTunAI model 3', category: 'Text-to-image', documentsCount: 78, lastUpdated: '6 hours ago' },
];

const RagPage = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const filteredModels = models.filter(
    (model) => model.category.toLowerCase() === activeCategory.replace('-', '-')
  );

  const handleCreateRagPipeline = () => {
    setIsModalOpen(true);
  };
  
  const handleModalSubmit = (data: any) => {
    toast({
      title: "RAG Pipeline Created",
      description: "Your RAG pipeline has been successfully deployed."
    });
  };

  const handleModelCardClick = (modelId: number) => {
    // Get the selected model
    const selectedModel = models.find(model => model.id === modelId);
    // Open the modal with the selected model pre-selected
    setIsModalOpen(true);
  };

  const statsCards = [
    {
      title: 'Active RAG Pipelines',
      value: '14',
      description: '8 in production, 6 in development',
      icon: <Activity className="h-6 w-6 text-finetun-purple" />,
    },
    {
      title: 'Knowledge Base',
      value: '2.1 TB',
      description: '843 documents indexed',
      icon: <Database className="h-6 w-6 text-finetun-purple" />,
    },
    {
      title: 'Storage',
      value: '1.8 TB',
      description: '60% used of 3 TB',
      icon: <HardDrive className="h-6 w-6 text-finetun-purple" />,
    },
    {
      title: 'Retrieval Rate',
      value: '98.7%',
      description: '0.2% increase this week',
      icon: <Search className="h-6 w-6 text-finetun-purple" />,
    },
  ];

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AutoRAG</h1>
        <p className="text-gray-400">Deploy RAG pipelines with your models</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
        {statsCards.map((card, index) => (
          <Card key={index} className="bg-finetun-dark-light border-finetun-dark-lighter">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{card.title}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{card.value}</div>
              <p className="text-xs text-gray-400">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-6 flex justify-between items-center">
        <RagCategoryTabs
          categories={categories}
          onChange={setActiveCategory}
        />
        <button
          className="finetun-btn-primary flex items-center"
          onClick={handleCreateRagPipeline}
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
            documentsCount={model.documentsCount}
            lastUpdated={model.lastUpdated}
            onClick={() => handleModelCardClick(model.id)}
          />
        ))}
      </div>

      <NewRagModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleModalSubmit}
      />
    </AppLayout>
  );
};

export default RagPage;
