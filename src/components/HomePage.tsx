import { useState } from "react";
import MatchCard from "./MatchCard";
import { Button } from "@/components/ui/button";
import { Sparkles, Filter } from "lucide-react";

interface HomePageProps {
  userType: "participant" | "carer";
}

const HomePage = ({ userType }: HomePageProps) => {
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  // Mock data - would come from API
  const mockMatches: Array<{
    name: string;
    age: number;
    location: string;
    bio: string;
    interests: string[];
    userType: "participant" | "carer";
  }> = [
    {
      name: "Sarah",
      age: 28,
      location: "Sydney, NSW",
      bio: "Passionate about helping others achieve their goals. I love cooking, gardening, and creative activities. Looking forward to building meaningful connections!",
      interests: ["Cooking", "Art therapy", "Personal care", "Companionship"],
      userType: userType === "participant" ? "carer" : "participant",
    },
    {
      name: "Michael",
      age: 35,
      location: "Melbourne, VIC",
      bio: "Experienced support worker with a background in occupational therapy. I enjoy outdoor activities and helping people discover new hobbies.",
      interests: ["Outdoor activities", "Mobility support", "Life skills", "Exercise"],
      userType: userType === "participant" ? "carer" : "participant",
    },
    {
      name: "Emma",
      age: 24,
      location: "Brisbane, QLD",
      bio: "Creative and empathetic person who loves music and art. I'm here to provide companionship and support in daily activities.",
      interests: ["Music therapy", "Creative arts", "Social outings", "Daily living"],
      userType: userType === "participant" ? "carer" : "participant",
    },
  ];

  const handleLike = () => {
    console.log("Liked:", mockMatches[currentMatchIndex].name);
    nextMatch();
  };

  const handlePass = () => {
    console.log("Passed:", mockMatches[currentMatchIndex].name);
    nextMatch();
  };

  const nextMatch = () => {
    if (currentMatchIndex < mockMatches.length - 1) {
      setCurrentMatchIndex(currentMatchIndex + 1);
    } else {
      setCurrentMatchIndex(0); // Loop back for demo
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12 bg-white border-b shadow-soft">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Discover</h1>
          <p className="text-muted-foreground">Find your perfect match</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="text-foreground">
            <Filter className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Match Cards */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        {mockMatches.length > 0 ? (
          <div className="animate-slide-up">
            <MatchCard
              {...mockMatches[currentMatchIndex]}
              onLike={handleLike}
              onPass={handlePass}
            />
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center mx-auto">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">No more matches</h3>
            <p className="text-muted-foreground">Check back later for new connections!</p>
          </div>
        )}
      </div>

      {/* Match Counter */}
      <div className="text-center pb-4">
        <div className="inline-flex items-center space-x-2 bg-white border shadow-soft rounded-full px-4 py-2">
          <div className="flex space-x-1">
            {mockMatches.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentMatchIndex ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-muted-foreground text-sm">
            {currentMatchIndex + 1} of {mockMatches.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;