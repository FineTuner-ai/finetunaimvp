import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

type ModelCardProps = {
  title: string;
  category?: string;
  status?: string;
  onClick?: () => void;
};

export const ModelCard = ({ title, category = 'LLM', status = 'Ready', onClick }: ModelCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ready':
        return 'bg-green-500/20 text-green-400';
      case 'training':
        return 'bg-amber-500/20 text-amber-400';
      case 'fine-tuning':
        return 'bg-blue-500/20 text-blue-400';
      case 'pending':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return 'bg-finetun-dark-lighter text-gray-400';
    }
  };

  const handleFineTune = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    toast({
      title: "Fine-tuning Model",
      description: `Starting fine-tuning for ${title}`,
    });
    navigate('/fine-tuning');
  };

  const handleOpenPlayground = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    toast({
      title: "Opening in Playground",
      description: `Opening ${title} in the Playground`,
    });
    navigate('/playground');
  };

  return (
    <div 
      className="finetun-card flex flex-col hover:shadow-lg cursor-pointer animate-fade-in"
      onClick={onClick}
    >
      <div className="flex items-center justify-center h-24 mb-4">
        <div className="h-16 w-16 rounded-lg bg-finetun-dark-lighter flex items-center justify-center border border-finetun-dark-lighter">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-finetun-purple">
            <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/>
            <path d="M7 7h.01"/>
          </svg>
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
        <div className="flex justify-center items-center space-x-2 mb-2">
          <p className="text-sm text-gray-400">{category}</p>
          <Badge variant="outline" className={`${getStatusColor(status)}`}>
            {status}
          </Badge>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-finetun-dark-lighter">
        <div className="flex justify-between">
          <button 
            className="finetun-btn-tertiary px-4 ml-10 py-2 flex items-center justify-center gap-2 text-sm font-medium rounded-md bg-finetun-dark-lighter transition-colors"
            onClick={handleOpenPlayground}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-finetun-purple"
            >
              <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/>
              <path d="M7 7h.01"/>
            </svg>
            Open in Playground
          </button>
        </div>
      </div>
    </div>
  );
};
