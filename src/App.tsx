
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RagPage from "./pages/RagPage";
import NotFound from "./pages/NotFound";
import FineTuningPage from "./pages/FineTuningPage";
import ModelsPage from "./pages/ModelsPage";
import PromptsPage from "./pages/PromptsPage";
import DeployPage from "./pages/DeployPage";
import PlaygroundPage from "./pages/PlaygroundPage";

// Create a client
const queryClient = new QueryClient();

// Define App as a function component
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/rag" element={<RagPage />} />
            <Route path="/fine-tuning" element={<FineTuningPage />} />
            <Route path="/models" element={<ModelsPage />} />
            <Route path="/prompts" element={<PromptsPage />} />
            <Route path="/deploy" element={<DeployPage />} />
            <Route path="/playground" element={<PlaygroundPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
