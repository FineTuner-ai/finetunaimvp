import { useState } from 'react';
import { AppLayout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, FileText, Users, Calendar, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const projects = [
  {
    id: 1,
    name: 'Customer Support Bot',
    description: 'AI assistant trained on support documentation to assist customers with common queries',
    team: ['John D.', 'Lisa M.', 'Alex K.'],
    lastUpdated: '2 days ago',
    collaborators: 3,
    status: 'active',
    favorite: true
  },
  {
    id: 2,
    name: 'Document Summarization',
    description: 'System to generate concise summaries from long-form legal documents',
    team: ['Sarah P.', 'Mike T.'],
    lastUpdated: '5 days ago',
    collaborators: 2,
    status: 'active',
    favorite: false
  },
  {
    id: 3,
    name: 'Financial Report Analysis',
    description: 'AI model to extract key metrics and insights from quarterly financial reports',
    team: ['Robert J.', 'Emily S.', 'David L.'],
    lastUpdated: '1 week ago',
    collaborators: 3,
    status: 'inactive',
    favorite: true
  },
 
];

const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const filteredProjects = activeTab === 'all' 
    ? projects 
    : activeTab === 'active' 
      ? projects.filter(p => p.status === 'active')
      : activeTab === 'favorites'
        ? projects.filter(p => p.favorite)
        : projects;

  const handleNewProject = () => {
    toast({
      title: "Create New Project",
      description: "Opening new project creation wizard"
    });
    navigate('/fine-tuning');
  };
  
  const handleOpenProject = (projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      toast({
        title: "Opening Project",
        description: `Opening ${project.name}`
      });
    }
  };

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Projects</h1>
        <p className="text-gray-400">Manage your AI project workflows</p>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue="all" className="w-[400px]">
          <TabsList className="bg-finetun-dark-light">
            <TabsTrigger value="all" onClick={() => setActiveTab('all')}>All Projects</TabsTrigger>
            <TabsTrigger value="active" onClick={() => setActiveTab('active')}>Active</TabsTrigger>
            <TabsTrigger value="favorites" onClick={() => setActiveTab('favorites')}>Favorites</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button className="finetun-btn-primary flex items-center" onClick={handleNewProject}>
          <Plus size={18} className="mr-2" />
          New Project
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={() => handleOpenProject(project.id)} />
        ))}
      </div>
    </AppLayout>
  );
};

const ProjectCard = ({ project, onOpen }: { project: any, onOpen: () => void }) => {
  return (
    <Card className="bg-finetun-dark-light border-finetun-dark-lighter hover:border-finetun-purple/50 transition-all">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg truncate">{project.name}</CardTitle>
              {project.favorite && (
                <Star size={16} className="flex-shrink-0 fill-yellow-500 text-yellow-500" />
              )}
            </div>
            <p className="text-sm text-gray-400 mt-1.5 line-clamp-2">{project.description}</p>
          </div>
          <Badge 
            variant="outline" 
            className={`flex-shrink-0 ${
              project.status === 'active' 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-gray-500/20 text-gray-400'
            }`}
          >
            {project.status === 'active' ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center text-gray-400">
            <Users size={16} className="mr-2 flex-shrink-0" />
            <span className="truncate">{project.collaborators} collaborators</span>
          </div>
          
          <div className="flex items-center text-gray-400">
            <Calendar size={16} className="mr-2 flex-shrink-0" />
            <span className="truncate">Updated {project.lastUpdated}</span>
          </div>
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          className="finetun-btn-secondary w-full h-9"
          onClick={onOpen}
        >
          <FileText size={16} className="mr-2" />
          Open
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectsPage;
