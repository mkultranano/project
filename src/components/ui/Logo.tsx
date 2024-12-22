import { Orbit } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Orbit className="w-8 h-8 text-yellow-400 animate-pulse-slow" />
      <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-purple-600 text-transparent bg-clip-text">
        SOULR
      </span>
    </div>
  );
}