
import { cn } from "@/lib/utils";
import { MessageList } from "@/components/MessageList";
import { ChatInput } from "@/components/ChatInput";
import type { Message } from "@/types/chat";

interface ChatContainerProps {
  messages: Message[];
  message: string;
  isDarkMode: boolean;
  onMessageChange: (message: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ChatContainer = ({
  messages,
  message,
  isDarkMode,
  onMessageChange,
  onSubmit,
}: ChatContainerProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        <MessageList messages={messages} isDarkMode={isDarkMode} />
      </div>
      <div className={cn(
        "border-t p-4",
        isDarkMode ? "border-gray-700" : "border-gray-200"
      )}>
        <div className="max-w-[75%] mx-auto">
          <ChatInput
            message={message}
            isDarkMode={isDarkMode}
            onMessageChange={onMessageChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};
