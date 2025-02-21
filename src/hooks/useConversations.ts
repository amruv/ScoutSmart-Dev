
import { useState } from "react";
import type { Conversation, Message } from "@/types/chat";

export const useConversations = () => {
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

  const [activeConversationId, setActiveConversationId] = useState(1);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  
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

  const addMessage = (message: string) => {
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
  };

  const handleRename = (conversation: Conversation, newTitle: string) => {
    if (newTitle.trim()) {
      setConversations(conversations.map(conv =>
        conv.id === conversation.id ? { ...conv, title: newTitle.trim() } : conv
      ));
    }
  };

  const handleDelete = (conversation: Conversation) => {
    setConversations(conversations.filter(conv => conv.id !== conversation.id));
    if (conversation.id === activeConversationId) {
      setActiveConversationId(conversations[0]?.id || 0);
    }
  };

  return {
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
  };
};
