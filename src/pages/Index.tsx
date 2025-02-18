
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { ChatList } from "@/components/ChatList";
import { ChatInput } from "@/components/ChatInput";
import { MessageList } from "@/components/MessageList";
import { RightSidebar } from "@/components/RightSidebar";
import { ChatDialogs } from "@/components/ChatDialogs";
import { ProfileBanner } from "@/components/ProfileBanner";
import type { Conversation, Message } from "@/types/chat";

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

      <RightSidebar
        isDarkMode={isDarkMode}
        rightSidebarOpen={rightSidebarOpen}
      />

      <ChatDialogs
        renameDialogOpen={renameDialogOpen}
        deleteDialogOpen={deleteDialogOpen}
        newTitle={newTitle}
        selectedConversation={selectedConversation}
        onRenameClose={() => setRenameDialogOpen(false)}
        onDeleteClose={() => setDeleteDialogOpen(false)}
        onNewTitleChange={setNewTitle}
        onConfirmRename={confirmRename}
        onConfirmDelete={confirmDelete}
      />
    </div>
  );
};

export default Index;
