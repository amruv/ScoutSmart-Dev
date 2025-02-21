
import { ChatList } from "@/components/ChatList";
import { ProfileBanner } from "@/components/ProfileBanner";
import type { Conversation } from "@/types/chat";

interface LeftSidebarProps {
  conversations: Conversation[];
  activeConversationId: number;
  isDarkMode: boolean;
  onNewChat: () => void;
  onChatSelect: (id: number) => void;
  onRename: (conversation: Conversation) => void;
  onDelete: (conversation: Conversation) => void;
  onLogout: () => void;
  onSettings: () => void;
}

export const LeftSidebar = ({
  conversations,
  activeConversationId,
  isDarkMode,
  onNewChat,
  onChatSelect,
  onRename,
  onDelete,
  onLogout,
  onSettings,
}: LeftSidebarProps) => {
  return (
    <div className="p-4 h-full relative">
      <div className="mt-4">
        <button 
          onClick={onNewChat}
          className="w-full px-4 py-2 text-left text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
        >
          New Chat
        </button>
      </div>
      <ChatList
        conversations={conversations}
        activeConversationId={activeConversationId}
        isDarkMode={isDarkMode}
        onChatSelect={onChatSelect}
        onRename={onRename}
        onDelete={onDelete}
      />
      <ProfileBanner 
        isDarkMode={isDarkMode}
        onLogout={onLogout}
        onSettings={onSettings}
      />
    </div>
  );
};
