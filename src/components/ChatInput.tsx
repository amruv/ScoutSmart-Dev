
import { useRef } from "react";
import { Paperclip, ArrowUpRight, FileUp, Image } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoUpload = () => {
    photoInputRef.current?.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Here you would normally upload the file to your backend
      toast.success(`File selected: ${file.name}`);
      
      // For now, we'll just add the file name to the message
      onMessageChange(message + ` [File: ${file.name}]`);
    }
  };

  const handlePhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Here you would normally upload the image to your backend
      toast.success(`Image selected: ${file.name}`);
      
      // For now, we'll just add the image name to the message
      onMessageChange(message + ` [Image: ${file.name}]`);
    }
  };

  return (
    <form className="flex items-center bg-gray-700 rounded-2xl px-4 py-2 shadow-md w-full" onSubmit={onSubmit}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={cn(
              "p-2 rounded-lg transition-colors",
              isDarkMode ? "hover:bg-gray-700 text-gray-200" : "hover:bg-gray-100"
            )}
          >
            <Paperclip className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={cn(
            "min-w-[8rem] rounded-lg p-1",
            isDarkMode ? "bg-gray-800 text-gray-200 border-gray-700" : "bg-white border-gray-200"
          )}
        >
          <DropdownMenuItem
            onClick={handleFileUpload}
            className={cn(
              "flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer",
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            )}
          >
            <FileUp className="h-4 w-4" />
            Upload File
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handlePhotoUpload}
            className={cn(
              "flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer",
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            )}
          >
            <Image className="h-4 w-4" />
            Upload Photo
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Hidden file input for document uploads */}
      <input 
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelected}
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,.csv"
      />
      
      {/* Hidden file input for image uploads */}
      <input 
        ref={photoInputRef}
        type="file"
        onChange={handlePhotoSelected}
        className="hidden"
        accept="image/*"
      />
      
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
