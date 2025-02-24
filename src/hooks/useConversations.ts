
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Conversation, Message } from "@/types/chat";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const { session } = useAuth();
  
  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const messages = activeConversation?.messages || [];

  // Fetch conversations on mount and when session changes
  useEffect(() => {
    if (session?.user) {
      fetchConversations();
    }
  }, [session?.user]);

  const fetchConversations = async () => {
    try {
      const { data: chats, error } = await supabase
        .from('chats')
        .select('*, chat_messages(*)')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const formattedChats = chats.map(chat => ({
        ...chat,
        messages: chat.chat_messages || []
      }));

      setConversations(formattedChats);
      if (formattedChats.length > 0 && !activeConversationId) {
        setActiveConversationId(formattedChats[0].id);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
      toast.error('Failed to load conversations');
    }
  };

  const handleNewChat = async () => {
    if (!session?.user?.id) return;

    try {
      const { data: newChat, error } = await supabase
        .from('chats')
        .insert({
          title: 'New Chat',
          profile_id: session.user.id
        })
        .select()
        .single();

      if (error) throw error;

      const chatWithMessages = { ...newChat, messages: [] };
      setConversations([chatWithMessages, ...conversations]);
      setActiveConversationId(chatWithMessages.id);
    } catch (error) {
      console.error('Error creating new chat:', error);
      toast.error('Failed to create new chat');
    }
  };

  const addMessage = async (message: string) => {
    if (!message.trim() || !activeConversationId || !session?.user?.id) return;

    try {
      // Insert user message
      const { data: userMessage, error: userMessageError } = await supabase
        .from('chat_messages')
        .insert({
          chat_id: activeConversationId,
          content: message,
          sender: 'USER',
          profile_id: session.user.id
        })
        .select()
        .single();

      if (userMessageError) throw userMessageError;

      // Update UI with user message
      setConversations(prevConversations =>
        prevConversations.map(conv =>
          conv.id === activeConversationId
            ? { ...conv, messages: [...conv.messages, userMessage] }
            : conv
        )
      );

      // Call OpenAI API through edge function
      const response = await supabase.functions.invoke('chat-with-ai', {
        body: { message }
      });

      if (response.error) throw response.error;

      // Insert AI response
      const { data: aiMessage, error: aiMessageError } = await supabase
        .from('chat_messages')
        .insert({
          chat_id: activeConversationId,
          content: response.data.response,
          sender: 'LLM',
          profile_id: session.user.id
        })
        .select()
        .single();

      if (aiMessageError) throw aiMessageError;

      // Update UI with AI response
      setConversations(prevConversations =>
        prevConversations.map(conv =>
          conv.id === activeConversationId
            ? { ...conv, messages: [...conv.messages, aiMessage] }
            : conv
        )
      );
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  const handleRename = async (conversation: Conversation, newTitle: string) => {
    if (!newTitle.trim() || !session?.user?.id) return;

    try {
      const { error } = await supabase
        .from('chats')
        .update({ title: newTitle.trim() })
        .eq('id', conversation.id)
        .eq('profile_id', session.user.id);

      if (error) throw error;

      setConversations(conversations.map(conv =>
        conv.id === conversation.id ? { ...conv, title: newTitle.trim() } : conv
      ));
    } catch (error) {
      console.error('Error renaming chat:', error);
      toast.error('Failed to rename chat');
    }
  };

  const handleDelete = async (conversation: Conversation) => {
    if (!session?.user?.id) return;

    try {
      const { error } = await supabase
        .from('chats')
        .delete()
        .eq('id', conversation.id)
        .eq('profile_id', session.user.id);

      if (error) throw error;

      setConversations(conversations.filter(conv => conv.id !== conversation.id));
      if (conversation.id === activeConversationId) {
        setActiveConversationId(conversations[0]?.id || null);
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
      toast.error('Failed to delete chat');
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
