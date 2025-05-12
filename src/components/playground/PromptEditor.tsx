
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type PromptEditorProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
};

export const PromptEditor = ({ value, onChange, onSubmit, isLoading }: PromptEditorProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">Prompt</h3>
        <div className="flex space-x-2">
          <Button variant="outline" className="text-xs h-8 finetun-btn-secondary">
            Templates
          </Button>
          <Button variant="outline" className="text-xs h-8 finetun-btn-secondary">
            Clear
          </Button>
        </div>
      </div>
      
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your prompt here..."
        className="finetun-input min-h-[200px] font-mono"
      />
      
      <div className="flex justify-between items-center">
        <div className="flex items-center text-xs text-gray-400">
          <span>{value.length} characters</span>
        </div>
        <Button 
          onClick={onSubmit} 
          className="finetun-btn-primary"
          disabled={isLoading || !value.trim()}
        >
          {isLoading ? 'Generating...' : 'Generate Response'}
        </Button>
      </div>
    </div>
  );
};
