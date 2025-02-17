
export interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface Conversation {
  id: number;
  title: string;
  date: string;
  messages: Message[];
}
