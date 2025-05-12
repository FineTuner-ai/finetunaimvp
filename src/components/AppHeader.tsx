
import { Search } from 'lucide-react';

type AppHeaderProps = {
  username?: string;
  avatarUrl?: string;
};

export const AppHeader = ({
  username = 'blockdevrel',
  avatarUrl = 'https://github.com/shadcn.png',
}: AppHeaderProps) => {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-finetun-dark-lighter">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="search"
            placeholder="Search"
            className="w-full py-2 pl-10 pr-4 bg-finetun-dark-light text-sm rounded-md border border-finetun-dark-lighter focus:outline-none focus:border-finetun-purple"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-400 text-xs">⌘/</span>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-finetun-purple">
            <img
              src={avatarUrl}
              alt={username}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-sm font-medium">{username}</span>
        </div>
      </div>
    </header>
  );
};
