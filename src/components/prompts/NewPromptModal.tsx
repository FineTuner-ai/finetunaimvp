
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

type NewPromptModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const NewPromptModal = ({ isOpen, onClose }: NewPromptModalProps) => {
  const [promptName, setPromptName] = useState("");
  const [promptText, setPromptText] = useState("");
  const [activeTab, setActiveTab] = useState("single");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit the form data
    console.log("Creating new prompt:", { promptName, promptText });
    
    // Reset form and close modal
    setPromptName("");
    setPromptText("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-finetun-dark-light border-finetun-dark-lighter">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">Create New Prompt</DialogTitle>
          <DialogDescription className="text-gray-400">
            Design a prompt template for your AI models.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="single" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full bg-finetun-dark">
            <TabsTrigger value="single">Single Prompt</TabsTrigger>
            <TabsTrigger value="collection">Prompt Collection</TabsTrigger>
          </TabsList>
          
          <TabsContent value="single">
            <form onSubmit={handleSubmit} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="prompt-name">Prompt Name</Label>
                <Input 
                  id="prompt-name" 
                  value={promptName}
                  onChange={(e) => setPromptName(e.target.value)}
                  className="finetun-input"
                  placeholder="E.g., Customer Inquiry Handler"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="prompt-text">Prompt Template</Label>
                <textarea 
                  id="prompt-text"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  className="finetun-input w-full min-h-[180px]"
                  placeholder="You are a customer service agent for {{company_name}}. Your task is to answer questions about {{product_name}} in a helpful and friendly manner. The customer's question is: {{customer_question}}"
                  required
                />
                <p className="text-xs text-gray-400">
                  Use {{variable_name}} for variables that will be replaced at runtime.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Available Models</Label>
                <div className="grid grid-cols-3 gap-2">
                  {['GPT-4o', 'Llama-3', 'Claude'].map((model) => (
                    <Button 
                      key={model}
                      type="button"
                      variant="outline" 
                      className="finetun-btn-secondary"
                    >
                      {model}
                    </Button>
                  ))}
                </div>
              </div>
              
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" className="finetun-btn-primary">
                  Save Prompt
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="collection">
            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="collection-name">Collection Name</Label>
                <Input 
                  id="collection-name" 
                  className="finetun-input"
                  placeholder="E.g., Customer Support Templates"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Prompts in Collection</Label>
                <div className="border border-finetun-dark-lighter rounded-md p-4 space-y-4">
                  <p className="text-center text-gray-400">No prompts added yet</p>
                  <Button variant="outline" className="w-full finetun-btn-secondary">
                    Add Prompt to Collection
                  </Button>
                </div>
              </div>
              
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="button" className="finetun-btn-primary">
                  Save Collection
                </Button>
              </DialogFooter>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
