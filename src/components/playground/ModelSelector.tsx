
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';

type ModelSelectorProps = {
  selectedModel: string;
  onModelChange: (model: string) => void;
};

export const ModelSelector = ({ selectedModel, onModelChange }: ModelSelectorProps) => {
  const models = [
    {
      name: 'Llama-3.3-70B-Instruct',
      category: 'LLM',
      finetune: true
    },
    {
      name: 'GPT-4o Custom',
      category: 'LLM',
      finetune: true
    },
    {
      name: 'Qwen2.5-Coder-7B',
      category: 'Code',
      finetune: false
    },
    {
      name: 'DALL-E 3',
      category: 'Vision',
      finetune: false
    }
  ];
  
  const handleModelChange = (value: string) => {
    onModelChange(value);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">Model</h3>
        <Button variant="outline" className="text-sm h-8 finetun-btn-secondary">
          Model Details
        </Button>
      </div>
      
      <Select value={selectedModel} onValueChange={handleModelChange}>
        <SelectTrigger className="finetun-input">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent className="bg-finetun-dark-light border-finetun-dark-lighter">
          {models.map((model) => (
            <SelectItem key={model.name} value={model.name} className="text-white focus:bg-finetun-dark focus:text-white">
              <div className="flex items-center justify-between w-full">
                <span>{model.name}</span>
                <div className="flex space-x-2">
                  <Badge variant="outline" className="bg-finetun-dark text-xs">
                    {model.category}
                  </Badge>
                  {model.finetune && (
                    <Badge variant="outline" className="bg-finetun-purple/20 text-finetun-purple text-xs">
                      Fine-tuned
                    </Badge>
                  )}
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <div className="flex space-x-2">
        <Button variant="outline" className="text-xs h-8 bg-finetun-dark-lighter border-finetun-dark-lighter text-white">
          Compare Models
        </Button>
        <Button variant="outline" className="text-xs h-8 bg-finetun-dark-lighter border-finetun-dark-lighter text-white">
          Version History
        </Button>
      </div>
    </div>
  );
};
