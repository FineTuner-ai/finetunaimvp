
import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, MessagesSquare } from 'lucide-react';
import { NewPromptModal } from '@/components/prompts/NewPromptModal';

const promptTemplates = [
  {
    id: 1,
    title: 'Customer Support',
    description: 'Templates for handling customer inquiries',
    count: 12
  },
  {
    id: 2,
    title: 'Content Creation',
    description: 'Prompts for generating marketing content',
    count: 8
  },
  {
    id: 3,
    title: 'Code Generation',
    description: 'Templates for software development tasks',
    count: 15
  },
  {
    id: 4,
    title: 'Data Analysis',
    description: 'Prompts for analyzing datasets and creating insights',
    count: 6
  },
  {
    id: 5,
    title: 'Personal Assistant',
    description: 'Templates for scheduling, reminders, and task management',
    count: 9
  },
  {
    id: 6,
    title: 'Creative Writing',
    description: 'Prompts for storytelling and creative content',
    count: 11
  }
];

const PromptsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTemplates = promptTemplates.filter(template => 
    template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Prompt Library</h1>
        <p className="text-gray-400">Create and manage prompt templates for your AI models</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            className="finetun-input pl-10"
            placeholder="Search prompt templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          className="finetun-btn-primary flex items-center ml-4"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={18} className="mr-2" />
          New Prompt
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="bg-finetun-dark-light border-finetun-dark-lighter hover:border-finetun-purple/50 cursor-pointer transition-all">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle className="text-lg font-medium text-white">{template.title}</CardTitle>
                <p className="text-sm text-gray-400 mt-1">{template.description}</p>
              </div>
              <div className="bg-finetun-dark-lighter p-2 rounded-full">
                <MessagesSquare className="h-5 w-5 text-finetun-purple" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{template.count} prompts</span>
                <Button variant="link" className="finetun-btn-tertiary p-0">View Library</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <NewPromptModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </AppLayout>
  );
};

export default PromptsPage;
