import { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask Onyx anything..."
        className="flex-1 bg-black rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      <button
        type="submit"
        className="p-3 rounded-full bg-gradient-to-r from-yellow-400 to-purple-600 hover:shadow-[0_0_20px_rgba(250,204,21,0.5)] transition-shadow"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
}