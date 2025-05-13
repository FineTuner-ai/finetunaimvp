import { Search } from "lucide-react";
import { FaUser } from "react-icons/fa";
import Logo from "../../public/logo.png"
import { Link } from 'react-router-dom';

import React from "react";
type AppHeaderProps = {
  username?: string;
  avatarUrl?: string;
};

export const AppHeader = ({
  username = "blockdevrel",
  // avatarUrl = "https://github.com",
}: AppHeaderProps) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-finetun-dark-lighter bg-finetun-dark">
      <div className="mx-auto w-full max-w-[1440px]  flex items-center justify-between">
        <div className="flex items-center cursor-pointer space-x-3">
          <Link to="/" className="flex items-center cursor-pointer space-x-3">
            <img src={Logo} alt="FineTunAI Logo" className="h-12 w-10" />
            <span className="text-white font-semibold text-xl tracking-tight">FineTunAI</span>
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <div className="w-72">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={16} className="text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="w-full py-2.5 pl-10 pr-4 bg-finetun-dark-light text-sm rounded-md border border-finetun-dark-lighter focus:outline-none focus:ring-2 focus:ring-finetun-purple focus:border-transparent transition-colors"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <kbd className="text-gray-400 text-xs font-mono">⌘/</kbd>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-finetun-purple flex items-center justify-center bg-finetun-dark-light">
              <FaUser className="h-5 w-5 text-gray-400" />
            </div>
            <span className="text-sm font-medium text-gray-200">{username}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
