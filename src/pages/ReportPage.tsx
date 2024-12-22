import { Clock, Music, Heart, Brain, Zap, Users } from 'lucide-react';
import { InsightCard } from '../components/report/InsightCard';
import { Card } from '../components/ui/Card';

export function ReportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#1a1a1a] text-white p-6 pb-24">
      <h1 className="text-2xl font-bold mb-2">Your SOULRMapped Report</h1>
      <p className="text-[#ffffff99] mb-6">Weekly insights into your authentic self</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <InsightCard
          title="Screen Time"
          value="6.2h"
          icon={<Clock className="w-6 h-6 text-yellow-400" />}
          trend="down"
        />
        <InsightCard
          title="Music Time"
          value="2.8h"
          icon={<Music className="w-6 h-6 text-yellow-400" />}
          trend="up"
        />
        <InsightCard
          title="Wellness"
          value="85%"
          icon={<Heart className="w-6 h-6 text-yellow-400" />}
          trend="up"
        />
        <InsightCard
          title="Focus"
          value="92%"
          icon={<Brain className="w-6 h-6 text-yellow-400" />}
          trend="neutral"
        />
      </div>

      <Card className="mb-6">
        <h2 className="text-xl font-bold mb-4">Energy Distribution</h2>
        <div className="space-y-4">
          {[
            { label: 'Creative Work', value: 45, icon: Zap },
            { label: 'Social Activities', value: 30, icon: Users },
            { label: 'Entertainment', value: 25, icon: Music },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm">{label}</span>
                </div>
                <span className="text-sm text-[#ffffff99]">{value}%</span>
              </div>
              <div className="h-2 bg-black rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-purple-600"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold mb-4">Weekly Highlights</h2>
        <ul className="space-y-4">
          {[
            "Increased creative activities by 15%",
            "Reduced passive screen time by 2 hours",
            "More meaningful social interactions",
            "Better sleep patterns detected"
          ].map((highlight, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-yellow-400 to-purple-600" />
              <span className="text-[#ffffff99]">{highlight}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}