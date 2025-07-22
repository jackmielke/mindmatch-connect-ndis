import { useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";
import Onboarding from "@/components/Onboarding";
import HomePage from "@/components/HomePage";
import MessagesPage from "@/components/MessagesPage";
import AIHelperPage from "@/components/AIHelperPage";
import ProfilePage from "@/components/ProfilePage";
import Navigation from "@/components/Navigation";

type AppState = "splash" | "onboarding" | "app";
type UserType = "participant" | "carer";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("splash");
  const [userType, setUserType] = useState<UserType | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("home");

  const handleSplashComplete = () => {
    setAppState("onboarding");
  };

  const handleOnboardingComplete = (type: UserType, data: any) => {
    setUserType(type);
    setUserData(data);
    setAppState("app");
  };

  if (appState === "splash") {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (appState === "onboarding") {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case "home":
        return <HomePage userType={userType!} />;
      case "messages":
        return <MessagesPage />;
      case "ai":
        return <AIHelperPage />;
      case "profile":
        return <ProfilePage userType={userType!} userData={userData} />;
      default:
        return <HomePage userType={userType!} />;
    }
  };

  return (
    <div className="relative">
      {renderActiveTab()}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
