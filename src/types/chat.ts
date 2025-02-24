
export interface Message {
  id: string;
  content: string;
  sender: 'USER' | 'LLM';
  created_at: string;
  chat_id: string;
  profile_id: string;
}

export interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  profile_id: string;
  is_archived: boolean;
  messages: Message[];
}
