import { useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";
import Onboarding from "@/components/Onboarding";
import HomePage from "@/components/HomePage";
import MessagesPage from "@/components/MessagesPage";
import AIHelperPage from "@/components/AIHelperPage";
import ProfilePage from "@/components/ProfilePage";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

type AppState = "splash" | "onboarding" | "app";
type UserType = "participant" | "carer";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("splash");
  const [activeTab, setActiveTab] = useState("home");
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();

  // Determine app state based on auth and profile status
  useEffect(() => {
    if (authLoading || profileLoading) return;
    
    if (!user) {
      setAppState("onboarding");
    } else if (user && !profile) {
      setAppState("onboarding");
    } else if (user && profile) {
      setAppState("app");
    }
  }, [user, profile, authLoading, profileLoading]);

  const handleSplashComplete = () => {
    setAppState("onboarding");
  };

  const handleOnboardingComplete = () => {
    // Profile creation is handled in the Onboarding component
    // Just refresh the app state
    setAppState("app");
  };

  // Show loading while checking auth state
  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (appState === "splash") {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (appState === "onboarding") {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const renderActiveTab = () => {
    if (!profile) return null;
    
    switch (activeTab) {
      case "home":
        return <HomePage userType={profile.user_type} />;
      case "messages":
        return <MessagesPage />;
      case "ai":
        return <AIHelperPage />;
      case "profile":
        return <ProfilePage userType={profile.user_type} userData={profile} />;
      default:
        return <HomePage userType={profile.user_type} />;
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
