
import { MessageSquare, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/types/chat";

interface ChatListProps {
  conversations: Conversation[];
  activeConversationId: number;
  isDarkMode: boolean;
  onChatSelect: (id: number) => void;
  onRename: (conversation: Conversation) => void;
}

export const ChatList = ({
  conversations,
  activeConversationId,
  isDarkMode,
  onChatSelect,
  onRename,
}: ChatListProps) => {
  return (
    <div className="mt-4 space-y-2">
      {conversations.map((conv) => (
        <div
          key={conv.id}
          className={cn(
            "group p-3 rounded-lg cursor-pointer transition-colors flex items-center justify-between",
            activeConversationId === conv.id
              ? "bg-black text-white"
              : isDarkMode 
                ? "hover:bg-gray-700" 
                : "hover:bg-gray-200"
          )}
        >
          <div 
            className="flex items-center space-x-3 flex-1"
            onClick={() => onChatSelect(conv.id)}
          >
            <MessageSquare className={cn(
              "h-5 w-5",
              activeConversationId === conv.id ? "text-white" : "text-gray-500"
            )} />
            <div>
              <p className="text-sm font-medium truncate">{conv.title}</p>
              <p className={cn(
                "text-xs",
                activeConversationId === conv.id ? "text-white/70" : "text-gray-500"
              )}>{conv.date}</p>
            </div>
          </div>
          <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRename(conv);
              }}
              className="p-1 hover:bg-gray-700 rounded"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
