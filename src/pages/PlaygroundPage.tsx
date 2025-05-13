
import { useState } from 'react';
import { AppLayout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ModelSelector } from '@/components/playground/ModelSelector';
import { PromptEditor } from '@/components/playground/PromptEditor';
import { ModelResponse } from '@/components/playground/ModelResponse';
import { PlaygroundSettings } from '@/components/playground/PlaygroundSettings';

const PlaygroundPage = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Llama-3.3-70B-Instruct');
  
  const handleSubmit = () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setResponse('');
    
    // Simulate API call
    setTimeout(() => {
      setResponse(
        `As a ${selectedModel} model, I've analyzed your request and here's my response:\n\n` +
        `This is a simulated response to your prompt: "${prompt}"\n\n` +
        `In a real implementation, this would connect to the actual model API to generate a response based on your input. The playground allows you to test different prompts, compare models, and fine-tune your parameters to get the optimal results for your use case.`
      );
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Model Playground</h1>
        <p className="text-gray-400">Test and interact with your AI models</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-finetun-dark-light border-finetun-dark-lighter">
            <CardContent className="p-6">
              <ModelSelector 
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
              />
              
              <Separator className="my-6 bg-finetun-dark-lighter" />
              
              <PromptEditor
                value={prompt}
                onChange={setPrompt}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
          
          <ModelResponse 
            response={response}
            isLoading={isLoading}
          />
        </div>
        
        <div className="space-y-6">
          <Tabs defaultValue="parameters">
            <TabsList className="w-full bg-finetun-dark-light">
              <TabsTrigger value="parameters" className="flex-1">Parameters</TabsTrigger>
              <TabsTrigger value="testing" className="flex-1">Testing</TabsTrigger>
              <TabsTrigger value="sharing" className="flex-1">Sharing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="parameters" className="mt-4">
              <PlaygroundSettings />
            </TabsContent>
            
            <TabsContent value="testing" className="mt-4">
              <Card className="bg-finetun-dark-light border-finetun-dark-lighter">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-medium text-white mb-2">Test Suites</h3>
                  <p className="text-sm text-gray-400">Run benchmark tests against your model</p>
                  
                  <div className="space-y-3 mt-4">
                    <Button variant="outline" className="w-full justify-between finetun-btn-secondary">
                      General Capabilities
                      <span className="text-xs bg-finetun-dark px-2 py-1 rounded">12 tests</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-between finetun-btn-secondary">
                      Toxicity & Safety
                      <span className="text-xs bg-finetun-dark px-2 py-1 rounded">8 tests</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-between finetun-btn-secondary">
                      Factual Accuracy
                      <span className="text-xs bg-finetun-dark px-2 py-1 rounded">15 tests</span>
                    </Button>
                  </div>
                  
                  <Separator className="my-4 bg-finetun-dark-lighter" />
                  
                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">Create Custom Test</h4>
                    <Button className="w-full finetun-btn-secondary">
                      New Test Suite
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sharing" className="mt-4">
              <Card className="bg-finetun-dark-light border-finetun-dark-lighter">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-medium text-white mb-2">Share Playground</h3>
                  <p className="text-sm text-gray-400">Create shareable links to this playground session</p>
                  
                  <div className="space-y-4 mt-4">
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Collaboration Link</h4>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          className="finetun-input flex-1" 
                          value="https://finetunai.com/playground/share/abc123"
                          readOnly
                        />
                        <Button variant="outline" className="finetun-btn-secondary">
                          Copy
                        </Button>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Anyone with this link can view and edit this playground
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Read-only Link</h4>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          className="finetun-input flex-1" 
                          value="https://finetunai.com/playground/view/abc123"
                          readOnly
                        />
                        <Button variant="outline" className="finetun-btn-secondary">
                          Copy
                        </Button>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Anyone with this link can only view this playground
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

export default PlaygroundPage;
