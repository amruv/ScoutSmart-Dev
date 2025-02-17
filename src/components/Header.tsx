
import { Menu, X, BarChart2, Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface HeaderProps {
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
  isDarkMode: boolean;
  onLeftSidebarToggle: () => void;
  onRightSidebarToggle: () => void;
  onDarkModeToggle: (checked: boolean) => void;
}

export const Header = ({
  leftSidebarOpen,
  rightSidebarOpen,
  isDarkMode,
  onLeftSidebarToggle,
  onRightSidebarToggle,
  onDarkModeToggle,
}: HeaderProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-black text-white z-30 flex items-center justify-between px-4 shadow-md">
      <div className="flex items-center space-x-4">
        <button
          onClick={onLeftSidebarToggle}
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
        >
          {leftSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <h1 className="text-xl font-semibold text-center">Finding Ballers</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Sun className="h-4 w-4" />
          <Switch checked={isDarkMode} onCheckedChange={onDarkModeToggle} />
          <Moon className="h-4 w-4" />
        </div>
        <button
          onClick={onRightSidebarToggle}
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
        >
          {rightSidebarOpen ? <X className="h-5 w-5" /> : <BarChart2 className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
};
