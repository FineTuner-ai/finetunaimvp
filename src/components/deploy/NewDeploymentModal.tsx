
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

type NewDeploymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const NewDeploymentModal = ({ isOpen, onClose }: NewDeploymentModalProps) => {
  const [deploymentName, setDeploymentName] = useState("");
  const [activeTab, setActiveTab] = useState("api");
  const [selectedModel, setSelectedModel] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!deploymentName || !selectedModel) {
      toast({
        title: "Missing Information",
        description: "Please provide a deployment name and select a model",
        variant: "destructive"
      });
      return;
    }
    
    // Begin deployment process
    setIsDeploying(true);
    
    // Simulate deployment processing
    setTimeout(() => {
      setIsDeploying(false);
      
      // Success message
      toast({
        title: "Deployment Created",
        description: `${deploymentName} has been deployed successfully as a ${activeTab.toUpperCase()} endpoint.`
      });
      
      // Reset form and close modal
      setDeploymentName("");
      setSelectedModel("");
      onClose();
    }, 2000);
  };
  
  const handleModelSelection = (model: string) => {
    setSelectedModel(model);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-finetun-dark-light border-finetun-dark-lighter">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">Create New Deployment</DialogTitle>
          <DialogDescription className="text-gray-400">
            Deploy your model to production with just a few clicks.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="api" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full bg-finetun-dark">
            <TabsTrigger value="api">REST API</TabsTrigger>
            <TabsTrigger value="webhook">Webhooks</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>
          
          <TabsContent value="api">
            <form onSubmit={handleSubmit} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="deployment-name">Deployment Name</Label>
                <Input 
                  id="deployment-name" 
                  value={deploymentName}
                  onChange={(e) => setDeploymentName(e.target.value)}
                  className="finetun-input"
                  placeholder="E.g., Customer Support API"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="select-model">Select Model</Label>
                <select 
                  id="select-model"
                  className="finetun-input w-full"
                  required
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                >
                  <option value="">Select a model...</option>
                  <option value="llama">Llama-3.3-70B-Instruct</option>
                  <option value="gpt4">GPT-4o Custom</option>
                  <option value="coder">Qwen2.5-Coder-7B</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label>API Configuration</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="max-tokens" className="text-xs">Max Tokens</Label>
                    <Input 
                      id="max-tokens" 
                      type="number"
                      className="finetun-input"
                      defaultValue="1024"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeout" className="text-xs">Timeout (ms)</Label>
                    <Input 
                      id="timeout" 
                      type="number"
                      className="finetun-input"
                      defaultValue="30000"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label htmlFor="rate-limit" className="text-xs">Rate Limit</Label>
                    <Input 
                      id="rate-limit" 
                      type="number"
                      className="finetun-input"
                      defaultValue="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="auth-type" className="text-xs">Authentication</Label>
                    <select 
                      id="auth-type"
                      className="finetun-input w-full"
                    >
                      <option value="api-key">API Key</option>
                      <option value="oauth">OAuth</option>
                      <option value="jwt">JWT</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="finetun-btn-primary"
                  disabled={isDeploying}
                >
                  {isDeploying ? "Deploying..." : "Deploy API"}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="webhook">
            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="webhook-name">Webhook Name</Label>
                <Input 
                  id="webhook-name" 
                  className="finetun-input"
                  placeholder="E.g., Slack Integration"
                  value={deploymentName}
                  onChange={(e) => setDeploymentName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="select-integration">Integration Type</Label>
                <select 
                  id="select-integration"
                  className="finetun-input w-full"
                >
                  <option value="">Select integration...</option>
                  <option value="slack">Slack</option>
                  <option value="discord">Discord</option>
                  <option value="zapier">Zapier</option>
                  <option value="custom">Custom Webhook</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input 
                  id="webhook-url" 
                  className="finetun-input"
                  placeholder="https://..."
                />
              </div>
              
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  className="finetun-btn-primary"
                  onClick={handleSubmit}
                  disabled={isDeploying}
                >
                  {isDeploying ? "Creating..." : "Create Webhook"}
                </Button>
              </DialogFooter>
            </div>
          </TabsContent>
          
          <TabsContent value="export">
            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label>Export Format</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="finetun-btn-secondary text-left justify-start h-auto py-4"
                    onClick={() => handleModelSelection("huggingface")}
                  >
                    <div>
                      <h3 className="font-medium text-white text-left">Hugging Face</h3>
                      <p className="text-xs text-gray-400 text-left">Share on Hugging Face Hub</p>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="finetun-btn-secondary text-left justify-start h-auto py-4"
                    onClick={() => handleModelSelection("docker")}
                  >
                    <div>
                      <h3 className="font-medium text-white text-left">Docker</h3>
                      <p className="text-xs text-gray-400 text-left">Package as Docker container</p>
                    </div>
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <Button 
                    variant="outline" 
                    className="finetun-btn-secondary text-left justify-start h-auto py-4"
                    onClick={() => handleModelSelection("onnx")}
                  >
                    <div>
                      <h3 className="font-medium text-white text-left">ONNX</h3>
                      <p className="text-xs text-gray-400 text-left">Open Neural Network Exchange</p>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="finetun-btn-secondary text-left justify-start h-auto py-4"
                    onClick={() => handleModelSelection("torchscript")}
                  >
                    <div>
                      <h3 className="font-medium text-white text-left">TorchScript</h3>
                      <p className="text-xs text-gray-400 text-left">PyTorch serialized format</p>
                    </div>
                  </Button>
                </div>
              </div>
              
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  className="finetun-btn-primary"
                  onClick={handleSubmit}
                  disabled={isDeploying}
                >
                  {isDeploying ? "Exporting..." : "Export Model"}
                </Button>
              </DialogFooter>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
