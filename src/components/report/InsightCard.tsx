import { Card } from '../ui/Card';
import { ReactNode } from 'react';

interface InsightCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export function InsightCard({ title, value, icon, trend }: InsightCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  return (
    <Card className="flex items-center gap-4">
      <div className="p-3 rounded-full bg-gradient-to-r from-yellow-400/20 to-purple-600/20">
        {icon}
      </div>
      <div>
        <h3 className="text-sm text-[#ffffff99]">{title}</h3>
        <p className={`text-xl font-bold ${getTrendColor()}`}>{value}</p>
      </div>
    </Card>
  );
}