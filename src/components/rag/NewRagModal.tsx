
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { X, File, Upload, Database, Server, Check, Globe, Loader2 } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

type NewRagModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
};

export const NewRagModal = ({ isOpen, onClose, onSubmit }: NewRagModalProps) => {
  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 4;
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (activeStep < totalSteps) {
      setActiveStep(activeStep + 1);
    } else {
      // Handle final submission
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        if (onSubmit) {
          onSubmit({});
        }
        toast({
          title: "RAG Pipeline Created",
          description: "Your RAG pipeline has been successfully deployed.",
        });
        onClose();
      }, 2000);
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return <KnowledgeBaseStep />;
      case 2:
        return <RetrieverSetupStep />;
      case 3:
        return <ModelSelectionStep />;
      case 4:
        return <LaunchStep />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] bg-finetun-dark border-finetun-dark-lighter">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-bold">Create RAG Pipeline</DialogTitle>
            <button 
              onClick={onClose}
              className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-finetun-dark-light"
            >
              <X size={18} />
            </button>
          </div>
        </DialogHeader>

        <div className="flex items-center justify-center mb-6 mt-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  index + 1 === activeStep 
                    ? 'bg-finetun-purple text-white' 
                    : index + 1 < activeStep 
                    ? 'bg-finetun-purple/30 text-white' 
                    : 'bg-finetun-dark-lighter text-gray-400'
                }`}
              >
                {index + 1 < activeStep ? (
                  <Check size={18} />
                ) : (
                  index + 1
                )}
              </div>
              {index < totalSteps - 1 && (
                <div className={`h-1 w-16 ${
                  index + 1 < activeStep ? 'bg-finetun-purple/30' : 'bg-finetun-dark-lighter'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        <div className="py-4 max-h-[70vh] overflow-y-auto">
          <div className="mb-2 text-gray-400 text-sm">
            Step {activeStep} of {totalSteps}: {getStepTitle(activeStep)}
          </div>
          {renderStepContent()}
        </div>

        <div className="flex justify-between mt-4 pt-4 border-t border-finetun-dark-lighter">
          {activeStep > 1 ? (
            <button onClick={handleBack} className="finetun-btn-secondary">
              Back
            </button>
          ) : (
            <button onClick={onClose} className="finetun-btn-secondary">
              Cancel
            </button>
          )}

          <button 
            onClick={handleNext} 
            disabled={isSubmitting}
            className="finetun-btn-primary flex items-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="mr-2 animate-spin" />
                Deploying...
              </>
            ) : (
              activeStep === totalSteps ? 'Deploy Pipeline' : 'Next'
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

function getStepTitle(step: number): string {
  switch (step) {
    case 1:
      return "Knowledge Base";
    case 2:
      return "Retriever Setup";
    case 3:
      return "Model Selection";
    case 4:
      return "Launch";
    default:
      return "";
  }
}

const KnowledgeBaseStep = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-medium mb-2">Knowledge Base</h3>
        <p className="text-sm text-gray-400 mb-4">Upload documents or connect to external data source for your RAG pipeline</p>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-3 mb-2">
          <button className="finetun-btn-secondary flex-1 flex items-center justify-center py-3">
            <File size={18} className="mr-2" />
            Upload Files
          </button>
          <button className="finetun-btn-secondary flex-1 flex items-center justify-center py-3">
            <Globe size={18} className="mr-2" />
            Connect URL
          </button>
          <button className="finetun-btn-secondary flex-1 flex items-center justify-center py-3">
            <Database size={18} className="mr-2" />
            Connect DB
          </button>
        </div>
      
        <div className="border border-dashed border-finetun-dark-lighter rounded-lg p-8 flex flex-col items-center justify-center">
          <div className="h-16 w-16 rounded-lg bg-finetun-dark-lighter flex items-center justify-center mb-4">
            <Upload size={24} className="text-finetun-purple" />
          </div>
          <p className="text-gray-300 text-sm mb-2 font-medium">Upload your knowledge base</p>
          <p className="text-gray-400 text-sm mb-3">Drag and drop files or click to browse</p>
          <p className="text-xs text-gray-500">Supported file types: PDF, TXT, DOCX, CSV, JSON</p>
        </div>
      </div>
      
      <div className="bg-finetun-dark-light rounded-md p-4">
        <h4 className="text-sm font-medium mb-2 flex items-center">
          <Database size={16} className="mr-2 text-finetun-purple" />
          Recently Used Knowledge Bases
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between py-2 px-3 rounded hover:bg-finetun-dark cursor-pointer">
            <span className="text-sm">Customer Support Database (34 docs)</span>
            <span className="text-xs text-gray-400">Used 2 days ago</span>
          </div>
          <div className="flex justify-between py-2 px-3 rounded hover:bg-finetun-dark cursor-pointer">
            <span className="text-sm">Product Documentation (128 docs)</span>
            <span className="text-xs text-gray-400">Used 1 week ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const RetrieverSetupStep = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-medium mb-2">Retriever Setup</h3>
        <p className="text-sm text-gray-400 mb-4">Configure how your model retrieves information from the knowledge base</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Embedding Model</label>
          <div className="finetun-input flex items-center justify-between cursor-pointer h-12">
            <span>OpenAI Ada 2</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>
          <p className="text-xs text-gray-400">The model used to create vector embeddings of your documents</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Top K Results</label>
            <input type="number" defaultValue={5} min={1} max={20} className="finetun-input w-full" />
            <p className="text-xs text-gray-400">Number of documents to retrieve per query</p>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Similarity Threshold</label>
            <input type="number" defaultValue={0.7} min={0.1} max={1.0} step={0.1} className="finetun-input w-full" />
            <p className="text-xs text-gray-400">Minimum similarity score (0-1)</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Chunking Strategy</label>
          <div className="finetun-input flex items-center justify-between cursor-pointer h-12">
            <span>Paragraph-based</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>
          <p className="text-xs text-gray-400">How documents are split into smaller chunks</p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Advanced Settings</label>
          <div className="bg-finetun-dark-lighter p-4 rounded-md">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm">Rerank results</span>
              <div className="relative inline-block w-10 align-middle select-none">
                <input type="checkbox" id="rerank" className="sr-only" />
                <label htmlFor="rerank" className="block overflow-hidden h-6 rounded-full bg-finetun-dark-light cursor-pointer">
                  <span className="block h-6 w-6 rounded-full bg-finetun-purple transform translate-x-0 transition ease-in-out duration-200"></span>
                </label>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Use hybrid search</span>
              <div className="relative inline-block w-10 align-middle select-none">
                <input type="checkbox" id="hybrid" className="sr-only" checked />
                <label htmlFor="hybrid" className="block overflow-hidden h-6 rounded-full bg-finetun-dark-light cursor-pointer">
                  <span className="block h-6 w-6 rounded-full bg-finetun-purple transform translate-x-full transition ease-in-out duration-200"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModelSelectionStep = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-medium mb-2">Attach Model</h3>
        <p className="text-sm text-gray-400 mb-4">Select a model to use with your RAG pipeline</p>
      </div>

      <div className="space-y-4">
        <div className="finetun-card p-4 border-finetun-purple">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <input type="radio" name="model" checked id="model1" className="mr-3 h-4 w-4 text-finetun-purple" />
              <div>
                <h4 className="font-medium">From Fine-Tuned Models</h4>
                <p className="text-xs text-gray-400">Select a model you've fine-tuned</p>
              </div>
            </div>
            <span className="text-xs py-1 px-2 bg-finetun-purple/20 text-finetun-purple rounded-full">Recommended</span>
          </div>
        </div>

        <div className="finetun-card p-4">
          <div className="flex items-center">
            <input type="radio" name="model" id="model2" className="mr-3 h-4 w-4 text-finetun-purple" />
            <div>
              <h4 className="font-medium">Use Base Model</h4>
              <p className="text-xs text-gray-400">Select from available base models</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <label className="block text-sm font-medium">Select Model</label>
          <div className="finetun-input flex items-center justify-between cursor-pointer h-12">
            <span>Llama-3.3-70B-Instruct (Fine-tuned)</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Prompt Template</label>
          <textarea 
            className="finetun-input w-full h-32" 
            defaultValue={`You are an assistant that answers questions based on the context below.\n\nContext: {{context}}\n\nQuestion: {{question}}\n\nAnswer:`}
          ></textarea>
          <p className="text-xs text-gray-400">Template used to format queries to the model. Use {{context}} and {{question}} placeholders.</p>
        </div>
      </div>
    </div>
  );
};

const LaunchStep = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-medium mb-2">Launch Pipeline</h3>
        <p className="text-sm text-gray-400 mb-4">Review your configuration and deploy your RAG pipeline</p>
      </div>

      <div className="space-y-4">
        <div className="bg-finetun-dark-light rounded-md p-4">
          <h4 className="text-sm font-medium mb-3">Pipeline Summary</h4>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Knowledge Base</span>
              <span className="text-sm font-medium">Customer Support Database (34 docs)</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Embedding Model</span>
              <span className="text-sm font-medium">OpenAI Ada 2</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">LLM Model</span>
              <span className="text-sm font-medium">Llama-3.3-70B-Instruct (Fine-tuned)</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Top K Results</span>
              <span className="text-sm font-medium">5</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Similarity Threshold</span>
              <span className="text-sm font-medium">0.7</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">Pipeline Name</label>
          <input type="text" className="finetun-input w-full" defaultValue="Customer Support RAG" />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">Description</label>
          <textarea className="finetun-input w-full h-20" defaultValue="RAG pipeline for answering customer support queries using the customer support knowledge base."></textarea>
        </div>
        
        <div className="bg-finetun-dark-lighter p-4 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Deploy as API Endpoint</span>
            <div className="relative inline-block w-10 align-middle select-none">
              <input type="checkbox" id="api" className="sr-only" checked />
              <label htmlFor="api" className="block overflow-hidden h-6 rounded-full bg-finetun-dark-light cursor-pointer">
                <span className="block h-6 w-6 rounded-full bg-finetun-purple transform translate-x-full transition ease-in-out duration-200"></span>
              </label>
            </div>
          </div>
          <p className="text-xs text-gray-400">This will create an API endpoint that you can use to query your RAG pipeline.</p>
        </div>

        <div className="bg-finetun-dark-lighter p-4 rounded-md">
          <div className="flex items-center mb-2">
            <Server size={16} className="mr-2 text-finetun-purple" />
            <span className="text-sm font-medium">Estimated Resources</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Storage</span>
              <span>1.2 GB</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Compute</span>
              <span>2 vCPUs</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Memory</span>
              <span>8 GB RAM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
