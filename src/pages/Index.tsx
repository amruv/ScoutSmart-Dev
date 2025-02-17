import { useState } from "react";
import { MessageSquare, BarChart2, Menu, X, MoreVertical, Paperclip, ArrowUpRight, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { PlayerNameCarousel } from "@/components/PlayerNameCarousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface Conversation {
  id: number;
  title: string;
  date: string;
  messages: Message[];
}

const LEGENDARY_PLAYERS = ["Lionel Messi", "Cristiano Ronaldo", "Reece James"];

const Index = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState(1);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      title: "Talent Analysis - U21 Forwards",
      date: "2024-03-10",
      messages: [],
    },
    { id: 2, title: "Premier League Midfielders", date: "2024-03-09", messages: [] },
    { id: 3, title: "South American Prospects", date: "2024-03-08", messages: [] },
  ]);

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const messages = activeConversation?.messages || [];

  const handleNewChat = () => {
    const newId = Math.max(...conversations.map(c => c.id)) + 1;
    const newConversation: Conversation = {
      id: newId,
      title: `New Chat ${newId}`,
      date: new Date().toISOString().split('T')[0],
      messages: [],
    };
    setConversations([newConversation, ...conversations]);
    setActiveConversationId(newId);
  };

  const handleRename = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setNewTitle(conversation.title);
    setRenameDialogOpen(true);
  };

  const handleDelete = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setDeleteDialogOpen(true);
  };

  const confirmRename = () => {
    if (selectedConversation && newTitle.trim()) {
      setConversations(conversations.map(conv =>
        conv.id === selectedConversation.id ? { ...conv, title: newTitle.trim() } : conv
      ));
      setRenameDialogOpen(false);
    }
  };

  const confirmDelete = () => {
    if (selectedConversation) {
      setConversations(conversations.filter(conv => conv.id !== selectedConversation.id));
      if (selectedConversation.id === activeConversationId) {
        setActiveConversationId(conversations[0]?.id || 0);
      }
      setDeleteDialogOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversationId) {
        const userMessage: Message = {
          id: conv.messages.length + 1,
          content: message,
          isUser: true,
          timestamp: new Date(),
        };
        const assistantMessage: Message = {
          id: conv.messages.length + 2,
          content: "I understand you're interested in football scouting. Let me analyze that for you...",
          isUser: false,
          timestamp: new Date(),
        };
        return {
          ...conv,
          messages: [...conv.messages, userMessage, assistantMessage],
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setMessage("");
  };

  return (
    <div className={cn(
      "flex flex-col h-screen transition-colors duration-200",
      isDarkMode ? "bg-gray-900" : "bg-white"
    )}>
      <div className="fixed top-0 left-0 right-0 h-16 bg-black text-white z-30 flex items-center justify-between px-4 shadow-md">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            {leftSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <h1 className="text-xl font-semibold text-center">Finding Ballers</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
            />
            <Moon className="h-4 w-4" />
          </div>
          <button
            onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            {rightSidebarOpen ? <X className="h-5 w-5" /> : <BarChart2 className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "fixed left-0 top-16 h-[calc(100%-4rem)] w-80 border-r transition-all duration-300 ease-in-out z-20",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200",
          leftSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4">
          <button 
            onClick={handleNewChat}
            className="w-full px-4 py-2 text-left text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
          >
            New Chat
          </button>
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
                  onClick={() => setActiveConversationId(conv.id)}
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
                      handleRename(conv);
                    }}
                    className="p-1 hover:bg-gray-700 rounded"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out mt-16",
        leftSidebarOpen ? "ml-80" : "ml-0",
        rightSidebarOpen ? "mr-80" : "mr-0",
        isDarkMode ? "bg-gray-900" : "bg-white"
      )}>
        <div className="h-full flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto">
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
                <div className="text-center text-gray-600 mt-8">
                  <p className="text-lg">
                    Which baller will you find who'll turn out to be the next{" "}
                    <PlayerNameCarousel players={LEGENDARY_PLAYERS} />
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className={cn(
            "border-t p-4",
            isDarkMode ? "border-gray-700" : "border-gray-200"
          )}>
            <div className="max-w-[75%] mx-auto">
              <form className="flex items-center space-x-4" onSubmit={handleSubmit}>
                <button
                  type="button"
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  )}
                >
                  <Paperclip className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about player analysis, scouting reports, or talent identification..."
                  className={cn(
                    "flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                    isDarkMode 
                      ? "bg-gray-800 border-gray-700 focus:ring-gray-600" 
                      : "bg-white border-gray-200 focus:ring-gray-200"
                  )}
                />
                <button
                  type="submit"
                  className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "fixed right-0 top-16 h-[calc(100%-4rem)] w-80 border-l transition-all duration-300 ease-in-out z-20",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200",
          rightSidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-4">
          <div className="space-y-4">
            <div className={cn(
              "p-4 rounded-lg border",
              isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
            )}>
              <h3 className="text-sm font-medium mb-2">Player Stats</h3>
              <div className={cn(
                "h-40 rounded-lg flex items-center justify-center",
                isDarkMode ? "bg-gray-800" : "bg-gray-100"
              )}>
                <p className="text-sm text-gray-500">Select a player to view stats</p>
              </div>
            </div>
            <div className={cn(
              "p-4 rounded-lg border",
              isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
            )}>
              <h3 className="text-sm font-medium mb-2">Performance Analysis</h3>
              <div className={cn(
                "h-40 rounded-lg flex items-center justify-center",
                isDarkMode ? "bg-gray-800" : "bg-gray-100"
              )}>
                <p className="text-sm text-gray-500">Select metrics to analyze</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Chat</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg"
              placeholder="Enter new title"
            />
          </div>
          <DialogFooter className="flex justify-end space-x-2">
            <button
              onClick={() => setRenameDialogOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={confirmRename}
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800"
            >
              Rename
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Chat</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p>Are you sure you want to delete this chat?</p>
          </div>
          <DialogFooter className="flex justify-end space-x-2">
            <button
              onClick={() => setDeleteDialogOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
