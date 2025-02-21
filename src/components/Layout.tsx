
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { RightSidebar } from "@/components/RightSidebar";

interface LayoutProps {
  children: React.ReactNode;
  leftSidebar: React.ReactNode;
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
  isDarkMode: boolean;
  onLeftSidebarToggle: () => void;
  onRightSidebarToggle: () => void;
  onDarkModeToggle: (checked: boolean) => void;
}

export const Layout = ({
  children,
  leftSidebar,
  leftSidebarOpen,
  rightSidebarOpen,
  isDarkMode,
  onLeftSidebarToggle,
  onRightSidebarToggle,
  onDarkModeToggle,
}: LayoutProps) => {
  return (
    <div className={cn(
      "flex flex-col h-screen transition-colors duration-200",
      isDarkMode ? "bg-gray-900" : "bg-white"
    )}>
      <Header
        leftSidebarOpen={leftSidebarOpen}
        rightSidebarOpen={rightSidebarOpen}
        isDarkMode={isDarkMode}
        onLeftSidebarToggle={onLeftSidebarToggle}
        onRightSidebarToggle={onRightSidebarToggle}
        onDarkModeToggle={onDarkModeToggle}
      />

      {/* Left Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-16 h-[calc(100%-4rem)] w-80 border-r transition-all duration-300 ease-in-out z-20",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200",
          leftSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {leftSidebar}
      </div>

      {/* Main Content */}
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out mt-16",
        leftSidebarOpen ? "ml-80" : "ml-0",
        rightSidebarOpen ? "mr-80" : "mr-0",
        isDarkMode ? "bg-gray-900" : "bg-white"
      )}>
        {children}
      </div>

      <RightSidebar
        isDarkMode={isDarkMode}
        rightSidebarOpen={rightSidebarOpen}
      />
    </div>
  );
};
