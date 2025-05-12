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
        <div className="mx-auto w-full max-w-[1440px] flex">
          <aside className="w-[240px] border-r border-finetun-dark-lighter px-4 py-2">
            <SidebarNav />
          </aside>
          <main className="flex-1 p-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
