
import { ReactNode } from 'react';
import { AppHeader } from './AppHeader';
import { SidebarNav } from './SidebarNav';

type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <div className="flex flex-1">
        <aside className="w-[240px] border-r border-finetun-dark-lighter px-4 py-2">
          <div className="flex items-center space-x-2 px-4 py-4">
            <div className="h-8 w-8 rounded bg-gradient-to-r from-finetun-purple to-finetun-purple-dark flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-white font-semibold text-xl">FineTunAI</span>
          </div>
          <SidebarNav />
        </aside>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
