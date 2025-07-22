import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300); // Wait for fade out
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-background transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center space-y-6">
        <div className="animate-pulse-glow">
          <img
            src="/lovable-uploads/cbc9e75b-e064-493c-81b5-c2c8ed94b417.png"
            alt="MindMatch Logo"
            className="w-24 h-24 md:w-32 md:h-32"
          />
        </div>
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            MindMatch
          </h1>
          <p className="text-white/80 text-lg">
            Connecting hearts and minds
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;