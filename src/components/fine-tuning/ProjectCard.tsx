
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

type ProjectCardProps = {
  name: string;
  model: string;
  status: string;
  progress: number;
  lastUpdated: string;
  onClick?: () => void;
};

export const ProjectCard = ({ 
  name, 
  model, 
  status, 
  progress, 
  lastUpdated, 
  onClick 
}: ProjectCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'training':
        return 'bg-amber-500/20 text-amber-400';
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      case 'paused':
        return 'bg-blue-500/20 text-blue-400';
      case 'pending':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return 'bg-finetun-dark-lighter text-gray-400';
    }
  };

  return (
    <div className="finetun-card hover:shadow-lg cursor-pointer animate-fade-in" onClick={onClick}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium text-white">{name}</h3>
          <p className="text-sm text-gray-400">Base: {model}</p>
        </div>
        <Badge variant="outline" className={`${getStatusColor(status)}`}>
          {status}
        </Badge>
      </div>
      
      {status.toLowerCase() === 'training' && (
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Progress</span>
            <span className="text-white">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
      
      <div className="text-xs text-gray-400 mb-4">
        Last updated: {lastUpdated}
      </div>
      
      <div className="flex justify-between pt-4 border-t border-finetun-dark-lighter">
        <button className="finetun-btn-tertiary py-1 text-sm">
          View Details
        </button>
        {status.toLowerCase() === 'completed' && (
          <button className="finetun-btn-tertiary py-1 text-sm">
            Open in Playground
          </button>
        )}
        {status.toLowerCase() === 'training' && (
          <button className="finetun-btn-tertiary py-1 text-sm">
            Pause Training
          </button>
        )}
        {status.toLowerCase() === 'paused' && (
          <button className="finetun-btn-tertiary py-1 text-sm">
            Resume Training
          </button>
        )}
      </div>
    </div>
  );
};
