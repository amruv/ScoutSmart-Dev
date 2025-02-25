
import { MessageSquare, MoreVertical, Trash, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/types/chat";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

interface ChatListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  isDarkMode: boolean;
  onChatSelect: (id: string) => void;
  onRename: (conversation: Conversation) => void;
  onDelete?: (conversation: Conversation) => void;
}

export const ChatList = ({
  conversations,
  activeConversationId,
  isDarkMode,
  onChatSelect,
  onRename,
  onDelete,
}: ChatListProps) => {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const handleDelete = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setDeleteConfirmOpen(true);
    setMenuOpen(null);
  };

  const confirmDelete = () => {
    if (selectedConversation && onDelete) {
      onDelete(selectedConversation);
      setDeleteConfirmOpen(false);
      setSelectedConversation(null);
    }
  };

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
                ? "hover:bg-gray-700 text-gray-100" 
                : "hover:bg-gray-200"
          )}
        >
          <div 
            className="flex items-center space-x-3 flex-1"
            onClick={() => onChatSelect(conv.id)}
          >
            <MessageSquare className={cn(
              "h-5 w-5",
              activeConversationId === conv.id ? "text-white" : isDarkMode ? "text-gray-300" : "text-gray-500"
            )} />
            <div>
              <p className="text-sm font-medium truncate">{conv.title}</p>
              <p className={cn(
                "text-xs",
                activeConversationId === conv.id ? "text-white/70" : isDarkMode ? "text-gray-300" : "text-gray-500"
              )}>{new Date(conv.created_at).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(menuOpen === conv.id ? null : conv.id);
              }}
              className={cn(
                "p-1 rounded transition-colors",
                isDarkMode ? "hover:bg-gray-600 text-gray-300" : "hover:bg-gray-300"
              )}
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            {menuOpen === conv.id && (
              <div className={cn(
                "absolute right-0 mt-1 py-1 w-32 rounded-lg shadow-lg z-10",
                isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white"
              )}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRename(conv);
                    setMenuOpen(null);
                  }}
                  className={cn(
                    "w-full px-3 py-1 text-left text-sm flex items-center space-x-2",
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  )}
                >
                  <Edit2 className="h-4 w-4" />
                  <span>Rename</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(conv);
                  }}
                  className={cn(
                    "w-full px-3 py-1 text-left text-sm flex items-center space-x-2",
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  )}
                >
                  <Trash className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Chat</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p>Are you sure you want to delete this chat?</p>
          </div>
          <DialogFooter className="flex justify-end space-x-2">
            <button
              onClick={() => setDeleteConfirmOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
            >
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
