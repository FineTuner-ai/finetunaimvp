
import { MouseEvent } from 'react';
import { Database, Calendar } from 'lucide-react';

type RagModelCardProps = {
  title: string;
  category?: string;
  documentsCount?: number;
  lastUpdated?: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
};

export const RagModelCard = ({ 
  title, 
  category = 'Text-to-text', 
  documentsCount = 0,
  lastUpdated = 'Recently',
  onClick 
}: RagModelCardProps) => {
  return (
    <div 
      className="finetun-card flex flex-col hover:shadow-lg cursor-pointer animate-fade-in"
      onClick={onClick}
    >
      <div className="flex items-center justify-center h-24 mb-4">
        <div className="h-16 w-16 rounded-lg bg-finetun-dark-lighter flex items-center justify-center border border-finetun-dark-lighter">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-finetun-purple">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <path d="M14 2v6h6"/>
          </svg>
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-400 mb-3">{category}</p>
      </div>
      
      <div className="mt-auto">
        <div className="flex items-center justify-center space-x-6 mb-4 text-sm text-gray-400">
          <div className="flex items-center">
            <Database size={16} className="mr-1.5 text-finetun-purple" />
            <span>{documentsCount} docs</span>
          </div>
          <div className="flex items-center">
            <Calendar size={16} className="mr-1.5 text-finetun-purple" />
            <span>{lastUpdated}</span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-finetun-dark-lighter">
          <button className="w-full finetun-btn-tertiary py-1 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Interact with model
          </button>
        </div>
      </div>
    </div>
  );
};
