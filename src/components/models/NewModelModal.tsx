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
import { Textarea } from "@/components/ui/textarea";

type NewModelModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const NewModelModal = ({ isOpen, onClose }: NewModelModalProps) => {
  const [modelName, setModelName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit the form data or process it
    console.log("Requesting new model:", { modelName, userEmail, comment });
    
    // Reset form and close modal
    setModelName("");
    setUserEmail("");
    setComment("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-finetun-dark-light border-finetun-dark-lighter">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">Request New Model</DialogTitle>
          <DialogDescription className="text-gray-400">
            Submit a request for a new AI model.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="model-name">Model Name</Label>
            <Input 
              id="model-name" 
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              className="finetun-input h-10"
              placeholder="Enter model name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="user-email">Your Email</Label>
            <Input 
              id="user-email" 
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="finetun-input h-10"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Additional Comments</Label>
            <Textarea 
              id="comment" 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="finetun-input min-h-[120px] resize-y"
              placeholder="Please provide detailed information about your model requirements, use cases, and any specific features you need..."
              required
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="finetun-btn-primary">
              Submit Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
