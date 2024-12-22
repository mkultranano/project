import { useState } from 'react';
import { AirplayIcon as Spotify, Instagram, NetworkIcon as Netflix, Gamepad, Plus, ChevronRight } from 'lucide-react';
import { Logo } from './ui/Logo';
import { Card } from './ui/Card';
import { AppButton } from './AppButton';
import { OnyxChat } from './chat/OnyxChat';

const apps = [
  { name: 'Spotify', icon: Spotify, color: 'text-green-500' },
  { name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
  { name: 'Netflix', icon: Netflix, color: 'text-red-500' },
  { name: 'PlayStation', icon: Gamepad, color: 'text-blue-500' },
];

export default function SoulrHome() {
  const [connectedApps, setConnectedApps] = useState<string[]>([]);

  const connectApp = (appName: string) => {
    if (!connectedApps.includes(appName)) {
      setConnectedApps([...connectedApps, appName]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#1a1a1a] text-white p-6">
      <header className="flex justify-between items-center mb-8">
        <Logo />
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-purple-600 p-[2px]">
          <div className="w-full h-full rounded-full bg-black" />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-2">Your Soul Orbit</h2>
            <p className="text-[#ffffff99] mb-6">Connect your apps to expand your orbit</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {apps.map((app) => (
                <AppButton
                  key={app.name}
                  {...app}
                  connected={connectedApps.includes(app.name)}
                  onClick={() => connectApp(app.name)}
                />
              ))}
              <button className="flex items-center justify-center gap-2 p-4 rounded-[25px] bg-black border border-dashed border-[#ffffff33] hover:border-yellow-400 transition-colors">
                <Plus className="w-6 h-6" />
                <span className="text-base font-bold">More Apps</span>
              </button>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-2">Humanity Score</h2>
            <p className="text-[#ffffff99] mb-6">Your journey to authenticity</p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">75%</span>
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-purple-600 text-sm font-bold">
                  Human
                </span>
              </div>
              <div className="h-2 bg-black rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-purple-600 transition-all duration-1000" 
                  style={{ width: '75%' }}
                />
              </div>
            </div>
          </Card>

          <button className="w-full p-4 rounded-[25px] bg-gradient-to-r from-yellow-400 to-purple-600 font-bold text-base hover:shadow-[0_0_20px_rgba(250,204,21,0.5)] transition-shadow">
            <span className="flex items-center justify-center gap-2">
              Generate SOULRMapped Report
              <ChevronRight className="w-5 h-5" />
            </span>
          </button>
        </div>

        <div className="lg:h-[calc(100vh-8rem)] sticky top-6">
          <OnyxChat />
        </div>
      </div>
    </div>
  );
}