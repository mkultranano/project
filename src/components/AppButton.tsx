import { LucideIcon } from 'lucide-react';

interface AppButtonProps {
  name: string;
  icon: LucideIcon;
  color: string;
  connected?: boolean;
  onClick: () => void;
}

export function AppButton({ name, icon: Icon, color, connected, onClick }: AppButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3 p-4 rounded-[25px]
        transition-all duration-300
        ${connected ? 'bg-[#1a1a1a]' : 'bg-black'}
        hover:shadow-[0_0_20px_rgba(250,204,21,0.5)]
        ${connected ? 'border border-yellow-400' : 'border border-transparent'}
      `}
    >
      <Icon className={`w-8 h-8 ${color}`} />
      <span className="text-base font-bold">{name}</span>
      {connected && (
        <span className="ml-auto text-sm bg-gradient-to-r from-yellow-400 to-purple-600 px-3 py-1 rounded-full">
          Connected
        </span>
      )}
    </button>
  );
}