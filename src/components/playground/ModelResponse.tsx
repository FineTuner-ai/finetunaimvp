
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ThumbsUp, ThumbsDown, Copy, Download } from 'lucide-react';

type ModelResponseProps = {
  response: string;
  isLoading: boolean;
};

export const ModelResponse = ({ response, isLoading }: ModelResponseProps) => {
  return (
    <Card className="bg-finetun-dark-light border-finetun-dark-lighter">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-white">Response</h3>
          {response && (
            <div className="flex space-x-2">
              <Button variant="outline" className="h-8 w-8 p-0 finetun-btn-secondary">
                <Copy size={14} />
              </Button>
              <Button variant="outline" className="h-8 w-8 p-0 finetun-btn-secondary">
                <Download size={14} />
              </Button>
            </div>
          )}
        </div>
        
        {isLoading ? (
          <div className="min-h-[200px] flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-t-2 border-finetun-purple rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400">Generating response...</p>
            </div>
          </div>
        ) : (
          <>
            {response ? (
              <div className="min-h-[200px]">
                <div className="font-mono whitespace-pre-wrap text-white bg-finetun-dark p-4 rounded-md">
                  {response}
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" className="h-8 w-8 p-0 finetun-btn-secondary">
                      <ThumbsUp size={14} />
                    </Button>
                    <Button variant="outline" className="h-8 w-8 p-0 finetun-btn-secondary">
                      <ThumbsDown size={14} />
                    </Button>
                    <span className="text-xs text-gray-400">Provide feedback</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Response generated in 1.2s
                  </div>
                </div>
              </div>
            ) : (
              <div className="min-h-[200px] flex items-center justify-center text-gray-400 border border-dashed border-finetun-dark-lighter rounded-md">
                <p>Response will appear here</p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
