
import { cn } from "@/lib/utils";
import { PlayerNameCarousel } from "@/components/PlayerNameCarousel";
import type { Message } from "@/types/chat";

interface MessageListProps {
  messages: Message[];
  isDarkMode: boolean;
}

const LEGENDARY_PLAYERS = ["Lionel Messi", "Cristiano Ronaldo", "Reece James"];

export const MessageList = ({ messages, isDarkMode }: MessageListProps) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {messages.length > 0 ? (
        messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "p-4 rounded-lg animate-fade-in",
              msg.isUser ? "bg-black text-white ml-auto" : isDarkMode ? "bg-gray-800" : "bg-gray-50"
            )}
            style={{ maxWidth: "85%" }}
          >
            <p className="text-sm">{msg.content}</p>
          </div>
        ))
      ) : (
        <div className="text-center mt-8">
          <div className={cn(
            "flex flex-col items-center justify-center gap-4",
            isDarkMode ? "text-white" : "text-gray-600"
          )}>
            <p className="text-lg">Which baller will you find who'll turn out to be the next...</p>
            <PlayerNameCarousel players={LEGENDARY_PLAYERS} />
          </div>
        </div>
      )}
    </div>
  );
};
