
import { Paperclip, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  message: string;
  isDarkMode: boolean;
  onMessageChange: (message: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ChatInput = ({
  message,
  isDarkMode,
  onMessageChange,
  onSubmit,
}: ChatInputProps) => {
  return (
    <form className="flex items-center space-x-4" onSubmit={onSubmit}>
      <button
        type="button"
        className={cn(
          "p-2 rounded-lg transition-colors",
          isDarkMode ? "hover:bg-gray-700 text-gray-200" : "hover:bg-gray-100"
        )}
      >
        <Paperclip className="h-5 w-5" />
      </button>
      <input
        type="text"
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        placeholder="Ask about player analysis, scouting reports, or talent identification..."
        className={cn(
          "flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all",
          isDarkMode 
            ? "bg-gray-800 border-gray-700 focus:ring-gray-600 text-gray-100 placeholder:text-gray-400" 
            : "bg-white border-gray-200 focus:ring-gray-200"
        )}
      />
      <button
        type="submit"
        className={cn(
          "p-2 bg-black text-white rounded-lg transition-colors",
          isDarkMode ? "hover:bg-gray-700 text-gray-200" : "hover:bg-gray-800"
        )}
      >
        <ArrowUpRight className="h-5 w-5" />
      </button>
    </form>
  );
};
