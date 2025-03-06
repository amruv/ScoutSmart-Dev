
import { PanelLeftClose, PanelLeft, BarChart2, Sun, Moon, PenSquare } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface HeaderProps {
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
  isDarkMode: boolean;
  onLeftSidebarToggle: () => void;
  onRightSidebarToggle: () => void;
  onDarkModeToggle: (checked: boolean) => void;
  onNewChat: () => void;
}

export const Header = ({
  leftSidebarOpen,
  rightSidebarOpen,
  isDarkMode,
  onLeftSidebarToggle,
  onRightSidebarToggle,
  onDarkModeToggle,
  onNewChat,
}: HeaderProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-black text-white z-30 flex items-center justify-between px-4 shadow-md">
      <div className="flex items-center space-x-6">
        <button
          onClick={onLeftSidebarToggle}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          {leftSidebarOpen ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeft className="h-5 w-5" />
          )}
        </button>
        <button
          onClick={onNewChat}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <PenSquare className="h-5 w-5" />
        </button>
        <h1 
          className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent animate-gradient"
        >
          ScoutSmart
        </h1>
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Sun className="h-4 w-4" />
          <Switch checked={isDarkMode} onCheckedChange={onDarkModeToggle} />
          <Moon className="h-4 w-4" />
        </div>
        <button
          onClick={onRightSidebarToggle}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <BarChart2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
