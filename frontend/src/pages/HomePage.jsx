import { useState } from 'react';
import HeroSection from '../components/Home/HeroSection';
import FeaturesSection from '../components/Home/FeaturesSection';
import LoginModal from '../components/Home/LoginModal';
import VideoModal from '../components/Home/VideoModal';
import FirstTimeBanner from '../components/Home/FirstTimeBanner';

const HomePage = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="animate-fade-in">
      <HeroSection onWatchDemo={() => setIsVideoOpen(true)} />
      <FeaturesSection />
      <LoginModal />
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
      <FirstTimeBanner onWatchDemo={() => setIsVideoOpen(true)} />
    </div>
  );
};

export default HomePage;
