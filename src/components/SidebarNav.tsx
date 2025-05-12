
import { Link, useLocation } from 'react-router-dom';
import { 
  Database, 
  FileText, 
  Folders, 
  MessagesSquare, 
  Rocket, 
  Sliders
} from 'lucide-react';

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
};

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-all ${
        isActive
          ? 'bg-finetun-purple/20 text-finetun-purple font-medium'
          : 'text-gray-400 hover:bg-finetun-dark-light'
      }`}
    >
      <div className={`${isActive ? 'text-finetun-purple' : 'text-gray-400'}`}>
        {icon}
      </div>
      <span>{label}</span>
    </Link>
  );
};

export const SidebarNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      to: '/fine-tuning',
      icon: <Sliders size={20} />,
      label: 'Fine Tuning',
    },
    {
      to: '/models',
      icon: <Folders size={20} />,
      label: 'Models',
    },
    {
      to: '/projects',
      icon: <FileText size={20} />,
      label: 'Projects',
    },
    {
      to: '/rag',
      icon: <Database size={20} />,
      label: 'AutoRAG',
    },
    {
      to: '/prompts',
      icon: <MessagesSquare size={20} />,
      label: 'Prompts',
    },
    {
      to: '/deploy',
      icon: <Rocket size={20} />,
      label: 'Deploy',
    },
  ];

  return (
    <div className="space-y-1 py-4">
      {navItems.map((item) => (
        <NavItem
          key={item.to}
          to={item.to}
          icon={item.icon}
          label={item.label}
          isActive={currentPath === item.to}
        />
      ))}
    </div>
  );
};
