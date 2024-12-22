import { useState } from 'react';
import { Card } from '../ui/Card';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

interface Message {
  id: number;
  text: string;
  isOnyx: boolean;
}

export function OnyxChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm Onyx, your AI guide to authentic human development. How can I assist you today?", isOnyx: true }
  ]);

  const handleSend = (text: string) => {
    setMessages(prev => [
      ...prev,
      { id: Date.now(), text, isOnyx: false }
    ]);
    
    // Simulate Onyx response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { 
          id: Date.now() + 1, 
          text: "I'm analyzing your data and will provide personalized insights soon. For now, I'm in development mode.", 
          isOnyx: true 
        }
      ]);
    }, 1000);
  };

  return (
    <Card className="flex flex-col h-[400px]">
      <h2 className="text-2xl font-bold mb-2">Chat with Onyx</h2>
      <p className="text-[#ffffff99] mb-6">Your AI guide to authentic human development</p>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map(message => (
          <ChatMessage key={message.id} isOnyx={message.isOnyx}>
            {message.text}
          </ChatMessage>
        ))}
      </div>
      
      <ChatInput onSend={handleSend} />
    </Card>
  );
}