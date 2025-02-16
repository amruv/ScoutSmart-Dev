
import { useState } from "react";
import { MessageSquare, BarChart2, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Index = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your football scouting assistant. I can help you analyze players, identify talent, and provide detailed scouting reports. What would you like to explore today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const conversations = [
    { id: 1, title: "Talent Analysis - U21 Forwards", date: "2024-03-10" },
    { id: 2, title: "Premier League Midfielders", date: "2024-03-09" },
    { id: 3, title: "South American Prospects", date: "2024-03-08" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: message,
      isUser: true,
      timestamp: new Date(),
    };

    // Add assistant response (placeholder for now)
    const assistantMessage: Message = {
      id: messages.length + 2,
      content: "I understand you're interested in football scouting. Let me analyze that for you...",
      isUser: false,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage, assistantMessage]);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Top Banner */}
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
        <button
          onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
        >
          {rightSidebarOpen ? <X className="h-5 w-5" /> : <BarChart2 className="h-5 w-5" />}
        </button>
      </div>

      {/* Left Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-16 h-[calc(100%-4rem)] w-80 bg-gray-50 border-r border-gray-200 transition-all duration-300 ease-in-out z-20",
          leftSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4">
          <button className="w-full px-4 py-2 text-left text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors">
            New Chat
          </button>
          <div className="mt-4 space-y-2">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className="p-3 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium truncate">{conv.title}</p>
                    <p className="text-xs text-gray-500">{conv.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out mt-16",
        leftSidebarOpen ? "ml-80" : "ml-0",
        rightSidebarOpen ? "mr-80" : "mr-0"
      )}>
        <div className="h-full flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "p-4 rounded-lg animate-fade-in",
                    msg.isUser ? "bg-black text-white ml-auto" : "bg-gray-50"
                  )}
                  style={{ maxWidth: "85%" }}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-200 p-4">
            <div className="max-w-3xl mx-auto">
              <form className="flex space-x-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about player analysis, scouting reports, or talent identification..."
                  className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div
        className={cn(
          "fixed right-0 top-16 h-[calc(100%-4rem)] w-80 bg-gray-50 border-l border-gray-200 transition-all duration-300 ease-in-out z-20",
          rightSidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-4">
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium mb-2">Player Stats</h3>
              <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-sm text-gray-500">Select a player to view stats</p>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium mb-2">Performance Analysis</h3>
              <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-sm text-gray-500">Select metrics to analyze</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
