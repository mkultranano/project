import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SoulrHome from './components/SoulrHome';
import { OnyxChat } from './components/chat/OnyxChat';
import { ReportPage } from './pages/ReportPage';
import { ProfilePage } from './pages/ProfilePage';
import { BottomNav } from './components/navigation/BottomNav';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-black to-[#1a1a1a]">
        <Routes>
          <Route path="/" element={<SoulrHome />} />
          <Route path="/chat" element={<OnyxChat />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;