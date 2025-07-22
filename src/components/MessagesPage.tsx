import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, ArrowLeft } from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  avatar?: string;
}

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");

  // Mock data
  const chats: Chat[] = [
    {
      id: "1",
      name: "Sarah",
      lastMessage: "Thanks for connecting! When would be a good time to meet?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      unread: 2,
    },
    {
      id: "2", 
      name: "Michael",
      lastMessage: "I'd love to help with your outdoor activities!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      unread: 0,
    },
    {
      id: "3",
      name: "Emma",
      lastMessage: "Looking forward to our creative sessions 🎨",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      unread: 1,
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      senderId: "sarah",
      content: "Hi! Thanks for connecting with me. I'm really excited to work together!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
    },
    {
      id: "2",
      senderId: "me",
      content: "Thanks Sarah! I'm looking forward to it too. What times work best for you?",
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
    },
    {
      id: "3",
      senderId: "sarah",
      content: "Thanks for connecting! When would be a good time to meet?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  if (selectedChat) {
    const chat = chats.find(c => c.id === selectedChat);
    
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Chat Header */}
        <div className="flex items-center space-x-4 p-4 pt-12 bg-white border-b shadow-soft">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedChat(null)}
            className="text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-primary text-white">
              {chat?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-foreground">{chat?.name}</h2>
            <p className="text-muted-foreground text-sm">Online now</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 min-h-[60vh]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.senderId === "me"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white border shadow-soft text-foreground"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.senderId === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t shadow-soft">
          <div className="flex space-x-3">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button
              variant="premium"
              size="icon"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="p-4 pt-12 bg-white border-b shadow-soft">
        <h1 className="text-2xl font-bold text-foreground mb-2">Messages</h1>
        <p className="text-muted-foreground">Connect with your matches</p>
      </div>

      {/* Chat List */}
      <div className="px-4 py-4 space-y-3">
        {chats.map((chat) => (
          <Card
            key={chat.id}
            className="cursor-pointer hover:shadow-medium transition-all duration-200 border shadow-soft bg-white"
            onClick={() => setSelectedChat(chat.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary text-white text-lg">
                    {chat.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-foreground truncate">
                      {chat.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(chat.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {chat.lastMessage}
                  </p>
                </div>

                {chat.unread > 0 && (
                  <div className="w-6 h-6 bg-accent-blue rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {chat.unread}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {chats.length === 0 && (
        <div className="text-center mt-20 space-y-4">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto">
            <Send className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">No messages yet</h3>
          <p className="text-muted-foreground">Start connecting to begin conversations!</p>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;