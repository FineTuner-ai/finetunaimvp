
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const PlaygroundSettings = () => {
  return (
    <Card className="bg-finetun-dark-light border-finetun-dark-lighter">
      <CardContent className="p-6 space-y-6">
        <h3 className="text-lg font-medium text-white mb-2">Generation Parameters</h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="temperature">Temperature</Label>
              <span className="text-finetun-purple text-sm">0.7</span>
            </div>
            <Slider
              id="temperature"
              defaultValue={[0.7]}
              max={1}
              step={0.1}
              className="w-full"
            />
            <p className="text-xs text-gray-400">
              Higher values produce more creative results, lower values are more deterministic.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="max-tokens">Max Tokens</Label>
              <span className="text-finetun-purple text-sm">1024</span>
            </div>
            <Slider
              id="max-tokens"
              defaultValue={[1024]}
              min={256}
              max={4096}
              step={128}
              className="w-full"
            />
            <p className="text-xs text-gray-400">
              Maximum number of tokens to generate.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="top-p">Top P</Label>
              <span className="text-finetun-purple text-sm">0.95</span>
            </div>
            <Slider
              id="top-p"
              defaultValue={[0.95]}
              max={1}
              step={0.05}
              className="w-full"
            />
            <p className="text-xs text-gray-400">
              Controls diversity via nucleus sampling.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-white">Advanced Options</h4>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="stream">Stream Response</Label>
                <p className="text-xs text-gray-400">
                  Show tokens as they're generated
                </p>
              </div>
              <Switch id="stream" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="log">Log Responses</Label>
                <p className="text-xs text-gray-400">
                  Save all interactions to history
                </p>
              </div>
              <Switch id="log" defaultChecked />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
