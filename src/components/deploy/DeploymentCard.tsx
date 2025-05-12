
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Code, Settings } from "lucide-react";

type DeploymentCardProps = {
  name: string;
  model: string;
  status: string;
  type: string;
  requests: string;
  lastDeployed: string;
};

export const DeploymentCard = ({
  name,
  model,
  status,
  type,
  requests,
  lastDeployed
}: DeploymentCardProps) => {
  const isActive = status.toLowerCase() === 'active';

  return (
    <div className="finetun-card hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-medium text-white">{name}</h3>
            <Badge
              variant="outline"
              className={`${
                isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
              }`}
            >
              {status}
            </Badge>
          </div>
          <p className="text-sm text-gray-400 mt-1">Model: {model}</p>
        </div>
        <div className="flex flex-col items-end">
          <Badge variant="outline" className="bg-finetun-dark mb-1">
            {type} Endpoint
          </Badge>
          <span className="text-xs text-gray-400">
            Last deployed: {lastDeployed}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-finetun-dark-lighter">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Activity size={16} className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-400">{requests}</span>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="h-8 px-3 py-1 text-xs" title="View API Documentation">
              <Code size={14} className="mr-1" />
              Docs
            </Button>
            <Button variant="outline" className="h-8 px-3 py-1 text-xs" title="Deployment Settings">
              <Settings size={14} className="mr-1" />
              Settings
            </Button>
            <Button 
              className={`h-8 px-3 py-1 text-xs ${isActive ? 'bg-red-500/80 hover:bg-red-500/60' : 'finetun-btn-primary'}`}
            >
              {isActive ? 'Deactivate' : 'Activate'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
