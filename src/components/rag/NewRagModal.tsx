
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { X } from "lucide-react";

type NewRagModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
};

export const NewRagModal = ({ isOpen, onClose, onSubmit }: NewRagModalProps) => {
  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 4;

  const handleNext = () => {
    if (activeStep < totalSteps) {
      setActiveStep(activeStep + 1);
    } else {
      // Handle final submission
      if (onSubmit) {
        onSubmit({});
      }
      onClose();
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
        return <EmbeddedModelStep />;
      case 2:
        return <DatasetStep />;
      case 3:
        return <VectorDatabaseStep />;
      case 4:
        return <IntegrationsStep />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-finetun-dark border-finetun-dark-lighter">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-bold">Auto RAG</DialogTitle>
            <button 
              onClick={onClose}
              className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-finetun-dark-light"
            >
              <X size={18} />
            </button>
          </div>
        </DialogHeader>

        <div className="py-4 max-h-[70vh] overflow-y-auto">
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

          <button onClick={handleNext} className="finetun-btn-primary">
            {activeStep === totalSteps ? 'Deploy' : 'Next'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const EmbeddedModelStep = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium">Embedded model</h3>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-400">Select model</label>
        <div className="finetun-input flex items-center justify-between cursor-pointer h-12">
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-finetun-purple">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <path d="M14 2v6h6"/>
            </svg>
            <span>Choose your desired model here</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

const DatasetStep = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium">Datasets</h3>
      <div className="border border-dashed border-finetun-dark-lighter rounded-lg p-8 flex flex-col items-center justify-center">
        <div className="h-16 w-16 rounded-lg bg-finetun-dark-lighter flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-finetun-purple">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </div>
        <p className="text-gray-400 text-sm mb-1">Upload your training dataset or drag and drop .json</p>
      </div>
    </div>
  );
};

const VectorDatabaseStep = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium">Embedded Vector database</h3>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-400">Database type</label>
        <div className="finetun-input flex items-center justify-between cursor-pointer h-12">
          <span>select embedded database or paste custom url</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

const IntegrationsStep = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">Integrations</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">W&B API key</label>
          <input type="text" className="finetun-input w-full" placeholder="Enter your Weights & Biases API key" />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">W&B project</label>
          <input type="text" className="finetun-input w-full" placeholder="Enter your Weights & Biases project name" />
        </div>
      </div>
    </div>
  );
};
