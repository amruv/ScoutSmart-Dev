
import { Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfileBannerProps {
  isDarkMode: boolean;
  onLogout?: () => void;
  onSettings?: () => void;
}

export const ProfileBanner = ({
  isDarkMode,
  onLogout,
  onSettings,
}: ProfileBannerProps) => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const { data } = await supabase
            .from('profiles')
            .select('display_name')
            .eq('id', user.id)
            .maybeSingle();
          
          if (data?.display_name) {
            setDisplayName(data.display_name);
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    fetchProfile();
  }, [user]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={cn(
      "absolute bottom-0 left-0 right-0 border-t p-4 text-lg",
      isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
    )}>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full">
          <div className={cn(
            "flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors",
            isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
          )}>
            <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
              <span className="text-white text-sm">{getInitials(displayName || 'User')}</span>
            </div>
            <div className="flex-1 text-left">
              <p className={cn(
                "text-sm font-medium",
                isDarkMode ? "text-gray-100" : "text-gray-900"
              )}>{displayName || 'User'}</p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className={cn(
            "w-[calc(320px-2rem)] mb-1",
            isDarkMode ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white border-gray-200"
          )}
          align="end"
        >
          <DropdownMenuItem
            onClick={onSettings}
            className={cn(
              "flex items-center space-x-2 px-3 py-2 cursor-pointer",
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            )}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onLogout}
            className={cn(
              "flex items-center space-x-2 px-3 py-2 cursor-pointer",
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            )}
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
