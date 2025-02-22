
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { LeftSidebar } from "@/components/LeftSidebar";
import { ChatContainer } from "@/components/ChatContainer";
import { ChatDialogs } from "@/components/ChatDialogs";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useConversations } from "@/hooks/useConversations";
import { useAuth } from "@/contexts/AuthContext";
import type { Conversation } from "@/types/chat";

const Index = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false); // Changed to false by default
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [message, setMessage] = useState("");
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const { signOut } = useAuth();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMessage(message);
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

      {false && <LoadingSpinner className="fixed inset-0 bg-black/20 backdrop-blur-sm" />}
    </Layout>
  );
};

export default Index;
