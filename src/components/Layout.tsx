
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
      "fixed inset-0 flex flex-col overflow-hidden",
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

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div
          className={cn(
            "fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 border-r transition-all duration-300 ease-in-out z-20 overflow-y-auto",
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200",
            leftSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {leftSidebar}
        </div>

        {/* Main Content */}
        <main className={cn(
          "flex-1 h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out mt-16",
          leftSidebarOpen ? "ml-80" : "ml-0",
          rightSidebarOpen ? "mr-80" : "mr-0",
          isDarkMode ? "bg-gray-900" : "bg-white"
        )}>
          {children}
        </main>

        <RightSidebar
          isDarkMode={isDarkMode}
          rightSidebarOpen={rightSidebarOpen}
        />
      </div>
    </div>
  );
};
