
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { LeftSidebar } from "@/components/LeftSidebar";
import { ChatContainer } from "@/components/ChatContainer";
import { ChatDialogs } from "@/components/ChatDialogs";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useConversations } from "@/hooks/useConversations";
import { useFootballData } from "@/hooks/useFootballData";
import { useAuth } from "@/contexts/AuthContext";
import type { Conversation } from "@/types/chat";

const Index = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [message, setMessage] = useState("");
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const { signOut } = useAuth();
  const { fetchData, isLoading: isFootballDataLoading } = useFootballData();

  const {
    conversations,
    activeConversationId,
    selectedConversation,
    messages,
    setActiveConversationId,
    setSelectedConversation,
    handleNewChat,
    addMessage,
    handleRename,
    handleDelete,
  } = useConversations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If the message contains a command to fetch football data
    if (message.toLowerCase().includes('!stats')) {
      const data = await fetchData('teams/statistics', {
        league: '39', // Premier League
        season: '2023'
      });
      
      // Add the stats to the message before sending to the LLM
      const enhancedMessage = `${message}\n\nTeam Statistics:\n${JSON.stringify(data, null, 2)}`;
      addMessage(enhancedMessage);
    } else {
      addMessage(message);
    }
    
    setMessage("");
  };

  const handleRenameClick = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setNewTitle(conversation.title);
    setRenameDialogOpen(true);
  };

  const handleDeleteClick = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setDeleteDialogOpen(true);
  };

  const confirmRename = () => {
    if (selectedConversation && newTitle.trim()) {
      handleRename(selectedConversation, newTitle);
      setRenameDialogOpen(false);
    }
  };

  const confirmDelete = () => {
    if (selectedConversation) {
      handleDelete(selectedConversation);
      setDeleteDialogOpen(false);
    }
  };

  const handleSettings = () => {
    console.log("Settings clicked");
  };

  return (
    <Layout
      leftSidebarOpen={leftSidebarOpen}
      rightSidebarOpen={rightSidebarOpen}
      isDarkMode={isDarkMode}
      onLeftSidebarToggle={() => setLeftSidebarOpen(!leftSidebarOpen)}
      onRightSidebarToggle={() => setRightSidebarOpen(!rightSidebarOpen)}
      onDarkModeToggle={setIsDarkMode}
      leftSidebar={
        <LeftSidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          isDarkMode={isDarkMode}
          onNewChat={handleNewChat}
          onChatSelect={setActiveConversationId}
          onRename={handleRenameClick}
          onDelete={handleDeleteClick}
          onLogout={signOut}
          onSettings={handleSettings}
        />
      }
    >
      <ChatContainer
        messages={messages}
        message={message}
        isDarkMode={isDarkMode}
        onMessageChange={setMessage}
        onSubmit={handleSubmit}
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

      {(isFootballDataLoading) && 
        <LoadingSpinner className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
      }
    </Layout>
  );
};

export default Index;
