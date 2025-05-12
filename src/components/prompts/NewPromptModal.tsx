
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface NewPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewPromptModal = ({ isOpen, onClose }: NewPromptModalProps) => {
  const [step, setStep] = useState(1);
  const [promptName, setPromptName] = useState('');
  const [promptDescription, setPromptDescription] = useState('');
  const [promptTemplate, setPromptTemplate] = useState('');
  const { toast } = useToast();
  
  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Prompt Created",
      description: `${promptName} has been created successfully`,
    });
    onClose();
    // Reset form
    setStep(1);
    setPromptName('');
    setPromptDescription('');
    setPromptTemplate('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-finetun-dark-light border-finetun-dark-lighter">
        <DialogHeader>
          <DialogTitle>Create New Prompt</DialogTitle>
        </DialogHeader>
        
        <div className="flex items-center justify-center mb-4">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <React.Fragment key={index}>
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index + 1 === step 
                    ? 'bg-finetun-purple text-white' 
                    : index + 1 < step 
                    ? 'bg-finetun-purple/30 text-white' 
                    : 'bg-finetun-dark-lighter text-gray-400'
                }`}
              >
                {index + 1}
              </div>
              {index < totalSteps - 1 && (
                <div className={`h-1 w-12 ${
                  index + 1 < step ? 'bg-finetun-purple/30' : 'bg-finetun-dark-lighter'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
        
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Prompt Name</Label>
              <Input 
                id="name" 
                className="finetun-input" 
                value={promptName} 
                onChange={(e) => setPromptName(e.target.value)} 
                placeholder="E.g., Customer Support Helper"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                className="finetun-input" 
                value={promptDescription} 
                onChange={(e) => setPromptDescription(e.target.value)} 
                placeholder="Describe what this prompt does..."
              />
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template">Prompt Template</Label>
              <Textarea 
                id="template" 
                className="finetun-input h-[200px]" 
                value={promptTemplate} 
                onChange={(e) => setPromptTemplate(e.target.value)} 
                placeholder="Write your prompt template here. Use {{variableName}} for dynamic content."
              />
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-4">
            <div className="p-4 bg-finetun-dark border border-finetun-dark-lighter rounded-md">
              <h4 className="font-medium mb-2">Prompt Details</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-gray-400">Name:</span>
                <span>{promptName}</span>
                <span className="text-gray-400">Description:</span>
                <span>{promptDescription}</span>
              </div>
            </div>
            <div className="p-4 bg-finetun-dark border border-finetun-dark-lighter rounded-md">
              <h4 className="font-medium mb-2">Template</h4>
              <pre className="text-xs bg-finetun-dark-lighter p-2 rounded whitespace-pre-wrap">
                {promptTemplate}
              </pre>
            </div>
          </div>
        )}
        
        <DialogFooter className="flex justify-between">
          {step > 1 ? (
            <Button 
              type="button" 
              variant="outline" 
              className="finetun-btn-secondary" 
              onClick={handleBack}
            >
              Back
            </Button>
          ) : (
            <div />
          )}
          <Button 
            type="button" 
            className="finetun-btn-primary" 
            onClick={handleNext}
          >
            {step < totalSteps ? 'Next' : 'Create Prompt'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
