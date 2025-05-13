
import { useState } from 'react';
import { AppLayout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Rocket, Server, Globe, Zap, ArrowRight } from 'lucide-react';
import { DeploymentCard } from '@/components/deploy/DeploymentCard';
import { NewDeploymentModal } from '@/components/deploy/NewDeploymentModal';

const deployments = [
  {
    id: 1,
    name: 'Customer Service Bot',
    model: 'Llama-3.3-70B-Instruct',
    status: 'Active',
    type: 'API',
    requests: '1.2k/day',
    lastDeployed: '3 days ago'
  },
  {
    id: 2,
    name: 'Content Moderator',
    model: 'Content Moderation Model',
    status: 'Active',
    type: 'Webhook',
    requests: '567/day',
    lastDeployed: '1 week ago'
  },
  {
    id: 3,
    name: 'Code Assistant API',
    model: 'Qwen2.5-Coder-7B',
    status: 'Inactive',
    type: 'API',
    requests: '0/day',
    lastDeployed: '2 weeks ago'
  }
];

const DeployPage = () => {
  const [activeTab, setActiveTab] = useState("deployments");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Deployment Hub</h1>
        <p className="text-gray-400">Deploy your models to production environments</p>
      </div>

      <Tabs defaultValue="deployments" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList className="bg-finetun-dark-light">
            <TabsTrigger value="deployments">Deployments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <Button
            className="finetun-btn-primary flex items-center"
            onClick={() => setIsModalOpen(true)}
          >
            <Rocket size={18} className="mr-2" />
            New Deployment
          </Button>
        </div>
        
        <TabsContent value="deployments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-finetun-dark-light border-finetun-dark-lighter">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">API Endpoints</CardTitle>
                <Server className="h-5 w-5 text-finetun-purple" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">2</div>
                <p className="text-xs text-gray-400">Active REST APIs</p>
              </CardContent>
            </Card>
            
            <Card className="bg-finetun-dark-light border-finetun-dark-lighter">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Webhooks</CardTitle>
                <Globe className="h-5 w-5 text-finetun-purple" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">1</div>
                <p className="text-xs text-gray-400">Connected integrations</p>
              </CardContent>
            </Card>
            
            <Card className="bg-finetun-dark-light border-finetun-dark-lighter">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Requests</CardTitle>
                <Zap className="h-5 w-5 text-finetun-purple" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">1.8k</div>
                <p className="text-xs text-gray-400">Daily average (last 7 days)</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your Deployments</h2>
            <div className="space-y-4">
              {deployments.map((deployment) => (
                <DeploymentCard
                  key={deployment.id}
                  name={deployment.name}
                  model={deployment.model}
                  status={deployment.status}
                  type={deployment.type}
                  requests={deployment.requests}
                  lastDeployed={deployment.lastDeployed}
                />
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="finetun-card h-96 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-medium text-white mb-2">Deployment Analytics</h3>
              <p className="text-gray-400 mb-6">View detailed metrics for your deployed models</p>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <Button className="finetun-btn-secondary">
                  API Usage
                </Button>
                <Button className="finetun-btn-secondary">
                  Performance
                </Button>
                <Button className="finetun-btn-secondary">
                  Error Logs
                </Button>
                <Button className="finetun-btn-secondary">
                  Latency
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="security">
          <div className="finetun-card h-96 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-medium text-white mb-2">Security & Access Control</h3>
              <p className="text-gray-400 mb-6">Manage API keys and access permissions</p>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <Button className="finetun-btn-secondary">
                  API Keys
                </Button>
                <Button className="finetun-btn-secondary">
                  Rate Limits
                </Button>
                <Button className="finetun-btn-secondary">
                  Access Logs
                </Button>
                <Button className="finetun-btn-secondary">
                  Permissions
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <NewDeploymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </AppLayout>
  );
};

export default DeployPage;
