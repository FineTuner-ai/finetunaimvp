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
    <div className="finetun-card hover:shadow-lg transition-shadow duration-200 p-6">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-white">{name}</h3>
            <Badge
              variant="outline"
              className={`px-2.5 py-0.5 rounded-full ${
                isActive ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
              }`}
            >
              {status}
            </Badge>
          </div>
          <p className="text-sm text-gray-400">Model: {model}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant="outline" className="bg-finetun-dark px-2.5 py-0.5 rounded-full">
            {type} Endpoint
          </Badge>
          <span className="text-xs text-gray-400">
            Last deployed: {lastDeployed}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-finetun-dark-lighter">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-gray-400" />
            <span className="text-sm text-gray-400">{requests}</span>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="h-8 px-3 py-1 text-xs hover:bg-gray-800/50 transition-colors"
              title="View API Documentation"
            >
              <Code size={14} className="mr-1.5" />
              Docs
            </Button>
            <Button 
              variant="outline" 
              className="h-8 px-3 py-1 text-xs hover:bg-gray-800/50 transition-colors"
              title="Deployment Settings"
            >
              <Settings size={14} className="mr-1.5" />
              Settings
            </Button>
            <Button 
              className={`h-8 px-3 py-1 text-xs transition-colors ${
                isActive 
                  ? 'bg-red-500/80 hover:bg-red-500/60' 
                  : 'finetun-btn-primary hover:bg-blue-600/80'
              }`}
            >
              {isActive ? 'Deactivate' : 'Activate'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
