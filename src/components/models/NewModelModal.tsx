
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

type NewModelModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const NewModelModal = ({ isOpen, onClose }: NewModelModalProps) => {
  const [activeTab, setActiveTab] = useState("new");
  const [modelName, setModelName] = useState("");
  const [baseModel, setBaseModel] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit the form data or process it
    console.log("Creating new model:", { modelName, baseModel });
    
    // Reset form and close modal
    setModelName("");
    setBaseModel("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-finetun-dark-light border-finetun-dark-lighter">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">Create New Model</DialogTitle>
          <DialogDescription className="text-gray-400">
            Configure your new AI model or import an existing one.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="new" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full bg-finetun-dark">
            <TabsTrigger value="new">Create New Model</TabsTrigger>
            <TabsTrigger value="import">Import Existing Model</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new">
            <form onSubmit={handleSubmit} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="model-name">Model Name</Label>
                <Input 
                  id="model-name" 
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  className="finetun-input"
                  placeholder="My Custom Model"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="base-model">Base Model</Label>
                <Input 
                  id="base-model" 
                  value={baseModel}
                  onChange={(e) => setBaseModel(e.target.value)}
                  className="finetun-input"
                  placeholder="e.g., gpt-4o-mini"
                  required
                />
                <p className="text-xs text-gray-400">
                  Select a foundation model to build upon or fine-tune.
                </p>
              </div>
              
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" className="finetun-btn-primary">
                  Create Model
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="import">
            <div className="space-y-6 pt-4">
              <div className="border-2 border-dashed border-finetun-dark-lighter rounded-lg p-8 text-center">
                <p className="text-gray-400 mb-4">
                  Drag and drop your model files here, or click to browse
                </p>
                <Button variant="outline" className="finetun-btn-secondary">
                  Browse Files
                </Button>
              </div>
              
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="button" className="finetun-btn-primary" disabled>
                  Import Model
                </Button>
              </DialogFooter>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
