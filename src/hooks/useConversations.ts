
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
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

  const addMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: activeConversation?.messages.length || 0 + 1,
      content: message,
      isUser: true,
      timestamp: new Date(),
    };

    // Update UI immediately with user message
    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversationId) {
        return {
          ...conv,
          messages: [...conv.messages, userMessage],
        };
      }
      return conv;
    });
    setConversations(updatedConversations);

    try {
      // Call OpenAI API through our edge function
      const response = await supabase.functions.invoke('chat-with-ai', {
        body: { message },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const aiMessage: Message = {
        id: (activeConversation?.messages.length || 0) + 2,
        content: response.data.response,
        isUser: false,
        timestamp: new Date(),
      };

      // Update conversations with AI response
      setConversations(conversations.map(conv => {
        if (conv.id === activeConversationId) {
          return {
            ...conv,
            messages: [...conv.messages, userMessage, aiMessage],
          };
        }
        return conv;
      }));
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      // Add error message to conversation
      const errorMessage: Message = {
        id: (activeConversation?.messages.length || 0) + 2,
        content: "Sorry, I encountered an error while processing your request.",
        isUser: false,
        timestamp: new Date(),
      };

      setConversations(conversations.map(conv => {
        if (conv.id === activeConversationId) {
          return {
            ...conv,
            messages: [...conv.messages, errorMessage],
          };
        }
        return conv;
      }));
    }
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
