
import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { NewProjectModal } from '@/components/fine-tuning/NewProjectModal';
import { ProjectCard } from '@/components/fine-tuning/ProjectCard';
import { Plus, Activity, Database, HardDrive } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const projects = [
  {
    id: 1,
    name: 'Customer Support Bot',
    model: 'Llama-3.3-70B',
    status: 'Training',
    progress: 67,
    lastUpdated: '2 hours ago'
  },
  {
    id: 2,
    name: 'Content Moderation',
    model: 'GPT-4o',
    status: 'Completed',
    progress: 100,
    lastUpdated: '1 day ago'
  },
  {
    id: 3,
    name: 'Code Assistant',
    model: 'Qwen2.5-Coder-7B',
    status: 'Paused',
    progress: 45,
    lastUpdated: '3 days ago'
  },
  
];

const FineTuningPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateProject = () => {
    setIsModalOpen(true);
  };

  const handleProjectCardClick = (id: number) => {
    // Find the project
    const project = projects.find(p => p.id === id);
    
    if (project) {
      if (project.status === 'Completed') {
        toast({
          title: "Opening in Playground",
          description: `Opening ${project.name} in the playground.`
        });
        // Navigate to playground or open in playground
      } else if (project.status === 'Training') {
        toast({
          title: "Training Details",
          description: `Viewing details for ${project.name}.`
        });
        // Show training details
      }
    }
  };

  const statsCards = [
    {
      title: 'Active Fine-tunes',
      value: '3',
      description: '2 in progress, 1 queued',
      icon: <Activity className="h-6 w-6 text-finetun-purple" />,
    },
    {
      title: 'GPU Usage',
      value: '68%',
      description: '4 GPUs active',
      icon: <Activity className="h-6 w-6 text-finetun-purple" />,
    },
    {
      title: 'Storage',
      value: '456 GB',
      description: '23% used of 2 TB',
      icon: <HardDrive className="h-6 w-6 text-finetun-purple" />,
    },
    {
      title: 'Training Data',
      value: '15.4 GB',
      description: '5 datasets',
      icon: <Database className="h-6 w-6 text-finetun-purple" />,
    },
  ];

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Fine-Tuning Workspace</h1>
        <p className="text-gray-400">Create and manage your fine-tuning projects</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Projects</h2>
        <Button 
          className="finetun-btn-primary flex items-center"
          onClick={handleCreateProject}
        >
          <Plus size={18} className="mr-2" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            name={project.name}
            model={project.model}
            status={project.status}
            progress={project.progress}
            lastUpdated={project.lastUpdated}
            onClick={() => handleProjectCardClick(project.id)}
          />
        ))}
      </div>

      <NewProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </AppLayout>
  );
};

export default FineTuningPage;
