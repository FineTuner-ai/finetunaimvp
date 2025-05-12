
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

type NewProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const NewProjectModal = ({ isOpen, onClose }: NewProjectModalProps) => {
  const [activeStep, setActiveStep] = useState(1);
  const [projectName, setProjectName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeStep < 5) {
      setActiveStep(activeStep + 1);
    } else {
      // Final submission
      console.log("Creating new fine-tuning project:", { projectName });
      setProjectName("");
      setActiveStep(1);
      onClose();
    }
  };

  const goBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-finetun-dark-light border-finetun-dark-lighter">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">Create Fine-Tuning Project</DialogTitle>
          <DialogDescription className="text-gray-400">
            Step {activeStep} of 5: {
              activeStep === 1 ? 'Project Setup' :
              activeStep === 2 ? 'Dataset Upload' :
              activeStep === 3 ? 'Model Selection' :
              activeStep === 4 ? 'Hyperparameters' :
              'Launch'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {activeStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input 
                  id="project-name" 
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="finetun-input"
                  placeholder="My Fine-Tuning Project"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="project-description">Description (Optional)</Label>
                <textarea 
                  id="project-description" 
                  className="finetun-input w-full min-h-[100px]"
                  placeholder="What are you trying to achieve with this fine-tuning?"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Tags (Optional)</Label>
                <Input 
                  className="finetun-input"
                  placeholder="Add tags separated by commas"
                />
                <p className="text-xs text-gray-400">
                  Tags help you organize and find your projects later.
                </p>
              </div>
            </div>
          )}
          
          {activeStep === 2 && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-finetun-dark-lighter rounded-lg p-8 text-center">
                <p className="text-gray-400 mb-4">
                  Drag and drop your dataset files here, or click to browse (CSV, JSON)
                </p>
                <Button variant="outline" className="finetun-btn-secondary">
                  Browse Files
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label>Dataset Format</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="finetun-btn-secondary text-left justify-start">
                    <span className="flex items-center">
                      CSV Format
                      <span className="ml-2 text-xs text-gray-400">(Prompt, Completion)</span>
                    </span>
                  </Button>
                  <Button variant="outline" className="finetun-btn-secondary text-left justify-start">
                    <span className="flex items-center">
                      JSONL Format
                      <span className="ml-2 text-xs text-gray-400">(Chat Format)</span>
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {activeStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Base Model</Label>
                <div className="grid grid-cols-1 gap-2">
                  {['Llama-3.3-70B', 'GPT-4o', 'Qwen2.5-Coder-7B', 'DeepSeek-V3'].map((model) => (
                    <button
                      key={model}
                      type="button"
                      className="finetun-card p-4 flex justify-between items-center hover:border-finetun-purple"
                    >
                      <div>
                        <h3 className="font-medium text-white">{model}</h3>
                        <p className="text-xs text-gray-400">General purpose LLM</p>
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        <span>Select</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="text-xs text-gray-400 mt-2">
                <p>Or upload your own model checkpoint</p>
                <Button variant="outline" className="mt-2 finetun-btn-secondary text-sm">
                  Upload Model
                </Button>
              </div>
            </div>
          )}
          
          {activeStep === 4 && (
            <div className="space-y-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <Label htmlFor="epochs">Epochs</Label>
                    <span className="text-sm text-finetun-purple">3</span>
                  </div>
                  <input
                    type="range"
                    id="epochs"
                    min="1"
                    max="10"
                    step="1"
                    defaultValue="3"
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>1</span>
                    <span>10</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <Label htmlFor="batch-size">Batch Size</Label>
                    <span className="text-sm text-finetun-purple">32</span>
                  </div>
                  <input
                    type="range"
                    id="batch-size"
                    min="8"
                    max="128"
                    step="8"
                    defaultValue="32"
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>8</span>
                    <span>128</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <Label htmlFor="learning-rate">Learning Rate</Label>
                    <span className="text-sm text-finetun-purple">0.0001</span>
                  </div>
                  <input
                    type="range"
                    id="learning-rate"
                    min="0.00001"
                    max="0.001"
                    step="0.00001"
                    defaultValue="0.0001"
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>0.00001</span>
                    <span>0.001</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <Button variant="outline" className="w-full finetun-btn-secondary text-sm">
                  Advanced Options
                </Button>
              </div>
            </div>
          )}
          
          {activeStep === 5 && (
            <div className="space-y-4">
              <div className="finetun-card p-4">
                <h3 className="font-medium text-white mb-4">Project Summary</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Project Name:</span>
                    <span className="text-white">{projectName || "My Fine-Tuning Project"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Base Model:</span>
                    <span className="text-white">Llama-3.3-70B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dataset:</span>
                    <span className="text-white">custom_dataset.csv (1.2GB)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Hyperparameters:</span>
                    <span className="text-white">3 epochs, batch size 32</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated Time:</span>
                    <span className="text-white">~4 hours</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-2 text-center text-sm text-gray-400">
                <p>Your fine-tuning job will be queued and started shortly.</p>
                <p>You can monitor progress from the dashboard.</p>
              </div>
            </div>
          )}
          
          <DialogFooter className="pt-4">
            {activeStep > 1 && (
              <Button type="button" variant="outline" onClick={goBack}>
                Back
              </Button>
            )}
            {activeStep < 5 ? (
              <Button type="submit" className="finetun-btn-primary">
                Next
              </Button>
            ) : (
              <Button type="submit" className="finetun-btn-primary">
                Start Training
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
