import { useState } from "react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { ChatList } from "@/components/ChatList";
import { ChatInput } from "@/components/ChatInput";
import { MessageList } from "@/components/MessageList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { Conversation, Message } from "@/types/chat";
import { ProfileBanner } from "@/components/ProfileBanner";
import { Activity, Radar, TrendingUp, Users, Target } from "lucide-react";

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

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  const handleSettings = () => {
    console.log("Settings clicked");
  };

  return (
    <div className={cn(
      "flex flex-col h-screen transition-colors duration-200",
      isDarkMode ? "bg-gray-900" : "bg-white"
    )}>
      <Header
        leftSidebarOpen={leftSidebarOpen}
        rightSidebarOpen={rightSidebarOpen}
        isDarkMode={isDarkMode}
        onLeftSidebarToggle={() => setLeftSidebarOpen(!leftSidebarOpen)}
        onRightSidebarToggle={() => setRightSidebarOpen(!rightSidebarOpen)}
        onDarkModeToggle={setIsDarkMode}
      />

      <div
        className={cn(
          "fixed left-0 top-16 h-[calc(100%-4rem)] w-80 border-r transition-all duration-300 ease-in-out z-20",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200",
          leftSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 h-full relative">
          <button 
            onClick={handleNewChat}
            className="w-full px-4 py-2 text-left text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
          >
            New Chat
          </button>
          <ChatList
            conversations={conversations}
            activeConversationId={activeConversationId}
            isDarkMode={isDarkMode}
            onChatSelect={setActiveConversationId}
            onRename={handleRename}
            onDelete={handleDelete}
          />
          <ProfileBanner 
            isDarkMode={isDarkMode}
            onLogout={handleLogout}
            onSettings={handleSettings}
          />
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
                onMessageChange={setMessage}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "fixed right-0 top-16 h-[calc(100%-4rem)] w-80 border-l transition-all duration-300 ease-in-out z-20 overflow-y-auto",
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
              <h3 className={cn(
                "text-sm font-medium mb-3 flex items-center gap-2",
                isDarkMode ? "text-gray-100" : "text-gray-900"
              )}>
                <Target className="h-4 w-4" />
                Key Attributes
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {["Pace", "Technique", "Vision", "Strength"].map((attr) => (
                  <div
                    key={attr}
                    className={cn(
                      "p-2 rounded-lg",
                      isDarkMode ? "bg-gray-800" : "bg-gray-100"
                    )}
                  >
                    <p className={cn(
                      "text-xs font-medium",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )}>{attr}</p>
                    <p className={cn(
                      "text-lg font-semibold",
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    )}>85</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={cn(
              "p-4 rounded-lg border",
              isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
            )}>
              <h3 className={cn(
                "text-sm font-medium mb-3 flex items-center gap-2",
                isDarkMode ? "text-gray-100" : "text-gray-900"
              )}>
                <TrendingUp className="h-4 w-4" />
                Performance Trends
              </h3>
              <div className={cn(
                "h-32 rounded-lg flex items-center justify-center",
                isDarkMode ? "bg-gray-800" : "bg-gray-100"
              )}>
                <p className={cn(
                  "text-sm",
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                )}>Performance data visualization</p>
              </div>
            </div>

            <div className={cn(
              "p-4 rounded-lg border",
              isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
            )}>
              <h3 className={cn(
                "text-sm font-medium mb-3 flex items-center gap-2",
                isDarkMode ? "text-gray-100" : "text-gray-900"
              )}>
                <Users className="h-4 w-4" />
                Similar Players
              </h3>
              <div className="space-y-2">
                {["Jude Bellingham", "Pedri", "Gavi"].map((player) => (
                  <div
                    key={player}
                    className={cn(
                      "p-2 rounded-lg flex items-center justify-between",
                      isDarkMode ? "bg-gray-800" : "bg-gray-100"
                    )}
                  >
                    <span className={cn(
                      "text-sm",
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    )}>{player}</span>
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                    )}>92% match</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={cn(
              "p-4 rounded-lg border",
              isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
            )}>
              <h3 className={cn(
                "text-sm font-medium mb-3 flex items-center gap-2",
                isDarkMode ? "text-gray-100" : "text-gray-900"
              )}>
                <Activity className="h-4 w-4" />
                Latest Match Performance
              </h3>
              <div className="space-y-2">
                <div className={cn(
                  "p-3 rounded-lg",
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                )}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={cn(
                      "text-xs",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )}>vs Manchester City</span>
                    <span className={cn(
                      "text-xs",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )}>Yesterday</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Minutes", value: "90'" },
                      { label: "Goals", value: "1" },
                      { label: "Assists", value: "2" },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <p className={cn(
                          "text-xs",
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        )}>{stat.label}</p>
                        <p className={cn(
                          "text-sm font-semibold",
                          isDarkMode ? "text-gray-200" : "text-gray-700"
                        )}>{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={cn(
              "p-4 rounded-lg border",
              isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
            )}>
              <h3 className={cn(
                "text-sm font-medium mb-3 flex items-center gap-2",
                isDarkMode ? "text-gray-100" : "text-gray-900"
              )}>
                <Radar className="h-4 w-4" />
                Skill Radar
              </h3>
              <div className={cn(
                "h-48 rounded-lg flex items-center justify-center",
                isDarkMode ? "bg-gray-800" : "bg-gray-100"
              )}>
                <p className={cn(
                  "text-sm",
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                )}>Radar chart visualization</p>
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
