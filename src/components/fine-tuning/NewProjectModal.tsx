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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

type NewProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const NewProjectModal = ({ isOpen, onClose }: NewProjectModalProps) => {
  const [activeStep, setActiveStep] = useState(1);
  const [projectName, setProjectName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [baseModel, setBaseModel] = useState("");
  const [epochs, setEpochs] = useState(3);
  const [batchSize, setBatchSize] = useState(32);
  const [learningRate, setLearningRate] = useState(0.0001);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeStep < 5) {
      setActiveStep(activeStep + 1);
    } else {
      // Final submission
      console.log("Creating new fine-tuning project:", { projectName });
      toast({
        title: "Project Created",
        description: `${projectName} has been created successfully`
      });
      setProjectName("");
      setActiveStep(1);
      setSelectedFile(null);
      onClose();
    }
  };

  const goBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      toast({
        title: "File Uploaded",
        description: `${files[0].name} has been uploaded successfully`
      });
    }
  };

  const handleBrowseFiles = () => {
    // Programmatically click the hidden file input
    document.getElementById('file-upload')?.click();
  };

  const toggleAdvancedOptions = () => {
    setShowAdvancedOptions(!showAdvancedOptions);
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
                <input 
                  type="file" 
                  id="file-upload"
                  className="hidden" 
                  accept=".csv,.json,.jsonl"
                  onChange={handleFileUpload}
                />
                <Button 
                  type="button"
                  variant="outline" 
                  className="finetun-btn-secondary"
                  onClick={handleBrowseFiles}
                >
                  Browse Files
                </Button>
                {selectedFile && (
                  <div className="mt-4 p-2 bg-finetun-dark rounded">
                    <p className="text-sm text-white">Selected: {selectedFile.name}</p>
                    <p className="text-xs text-gray-400">
                      Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Dataset Format</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    type="button"
                    variant="outline" 
                    className="finetun-btn-secondary text-left justify-start"
                  >
                    <span className="flex items-center">
                      CSV Format
                      <span className="ml-2 text-xs text-gray-400">(Prompt, Completion)</span>
                    </span>
                  </Button>
                  <Button 
                    type="button"
                    variant="outline" 
                    className="finetun-btn-secondary text-left justify-start"
                  >
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
                <Select onValueChange={setBaseModel} defaultValue="llama">
                  <SelectTrigger className="finetun-input">
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent className="bg-finetun-dark-light border-finetun-dark-lighter">
                    <SelectItem value="llama">Llama-3.3-70B</SelectItem>
                    <SelectItem value="gpt4o">GPT-4o</SelectItem>
                    <SelectItem value="qwen">Qwen2.5-Coder-7B</SelectItem>
                    <SelectItem value="deepseek">DeepSeek-V3</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-400 mt-1">
                  Select the base model you want to fine-tune
                </p>
              </div>
            </div>
          )}
          
          {activeStep === 4 && (
            <div className="space-y-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <Label htmlFor="epochs">Epochs</Label>
                    <span className="text-sm text-finetun-purple">{epochs}</span>
                  </div>
                  <input
                    type="range"
                    id="epochs"
                    min="1"
                    max="10"
                    step="1"
                    value={epochs}
                    onChange={(e) => setEpochs(parseInt(e.target.value))}
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
                    <span className="text-sm text-finetun-purple">{batchSize}</span>
                  </div>
                  <input
                    type="range"
                    id="batch-size"
                    min="8"
                    max="128"
                    step="8"
                    value={batchSize}
                    onChange={(e) => setBatchSize(parseInt(e.target.value))}
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
                    <span className="text-sm text-finetun-purple">{learningRate}</span>
                  </div>
                  <input
                    type="range"
                    id="learning-rate"
                    min="0.00001"
                    max="0.001"
                    step="0.00001"
                    value={learningRate}
                    onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>0.00001</span>
                    <span>0.001</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full finetun-btn-secondary text-sm"
                  onClick={toggleAdvancedOptions}
                >
                  {showAdvancedOptions ? "Hide Advanced Options" : "Advanced Options"}
                </Button>
              </div>
              
              {showAdvancedOptions && (
                <div className="space-y-4 pt-2 border-t border-finetun-dark-lighter">
                  <h3 className="text-sm font-medium text-white pt-2">Advanced Options</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="optimizer">Optimizer</Label>
                    <Select defaultValue="adamw">
                      <SelectTrigger className="finetun-input">
                        <SelectValue placeholder="Select optimizer" />
                      </SelectTrigger>
                      <SelectContent className="bg-finetun-dark-light border-finetun-dark-lighter">
                        <SelectItem value="adamw">AdamW</SelectItem>
                        <SelectItem value="sgd">SGD</SelectItem>
                        <SelectItem value="adam">Adam</SelectItem>
                        <SelectItem value="adafactor">Adafactor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight-decay">Weight Decay</Label>
                    <Input 
                      id="weight-decay" 
                      type="number"
                      defaultValue="0.01"
                      step="0.01"
                      min="0"
                      max="1"
                      className="finetun-input"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="warmup-steps">Warmup Steps</Label>
                    <Input 
                      id="warmup-steps" 
                      type="number"
                      defaultValue="100"
                      step="10"
                      min="0"
                      className="finetun-input"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="gradient-checkpointing" className="finetun-checkbox" />
                      <Label htmlFor="gradient-checkpointing">Enable Gradient Checkpointing</Label>
                    </div>
                    <p className="text-xs text-gray-400 ml-5">
                      Reduces memory usage but slightly increases computation time
                    </p>
                  </div>
                </div>
              )}
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
                    <span className="text-white">
                      {baseModel === "llama" ? "Llama-3.3-70B" :
                       baseModel === "gpt4o" ? "GPT-4o" :
                       baseModel === "qwen" ? "Qwen2.5-Coder-7B" :
                       baseModel === "deepseek" ? "DeepSeek-V3" : "Llama-3.3-70B"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dataset:</span>
                    <span className="text-white">
                      {selectedFile ? `${selectedFile.name} (${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)` : "custom_dataset.csv (1.2GB)"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Hyperparameters:</span>
                    <span className="text-white">{epochs} epochs, batch size {batchSize}, learning rate {learningRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated Time:</span>
                    <span className="text-white">~{Math.round(epochs * 1.5)} hours</span>
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