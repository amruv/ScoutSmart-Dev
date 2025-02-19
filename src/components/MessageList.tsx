
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
          <p className={cn(
            "text-lg inline-flex flex-wrap items-center justify-center gap-1",
            isDarkMode ? "text-white" : "text-gray-600"
          )}>
            <span>Which baller will you find who'll turn out to be the next...</span>
            <PlayerNameCarousel players={LEGENDARY_PLAYERS} />
          </p>
        </div>
      )}
    </div>
  );
};
