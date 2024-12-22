import { ReactNode } from 'react';

interface ChatMessageProps {
  isOnyx: boolean;
  children: ReactNode;
}

export function ChatMessage({ isOnyx, children }: ChatMessageProps) {
  return (
    <div className={`flex ${isOnyx ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`
        max-w-[80%] p-4 rounded-[25px]
        ${isOnyx ? 'bg-[#1a1a1a] rounded-tl-none' : 'bg-gradient-to-r from-yellow-400 to-purple-600 rounded-br-none'}
      `}>
        <p className="text-sm">{children}</p>
      </div>
    </div>
  );
}