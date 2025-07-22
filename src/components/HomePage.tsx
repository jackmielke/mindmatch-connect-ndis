import { useState } from "react";
import MatchCard from "./MatchCard";
import { Button } from "@/components/ui/button";
import { Sparkles, Filter } from "lucide-react";
import { useProfiles } from "@/hooks/useProfiles";
import { useProfile } from "@/hooks/useProfile";

interface HomePageProps {
  userType: "participant" | "carer";
}

const HomePage = ({ userType }: HomePageProps) => {
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const { profiles, loading } = useProfiles();
  const { profile: currentUserProfile } = useProfile();

  const handleLike = () => {
    console.log("Liked:", profiles[currentMatchIndex]?.name);
    nextMatch();
  };

  const handlePass = () => {
    console.log("Passed:", profiles[currentMatchIndex]?.name);
    nextMatch();
  };

  const nextMatch = () => {
    if (currentMatchIndex < profiles.length - 1) {
      setCurrentMatchIndex(currentMatchIndex + 1);
    } else {
      setCurrentMatchIndex(0); // Loop back for demo
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading profiles...</p>
        </div>
      </div>
    );
  }

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
        {profiles.length > 0 ? (
          <div className="animate-slide-up">
            <MatchCard
              name={profiles[currentMatchIndex].name}
              age={profiles[currentMatchIndex].age || 0}
              location={profiles[currentMatchIndex].location || "Location not specified"}
              bio={profiles[currentMatchIndex].bio || "No bio available"}
              interests={profiles[currentMatchIndex].interests_skills}
              userType={profiles[currentMatchIndex].user_type}
              userId={profiles[currentMatchIndex].user_id}
              onLike={handleLike}
              onPass={handlePass}
            />
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center mx-auto">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">No profiles found</h3>
            <p className="text-muted-foreground">Check back later for new connections!</p>
          </div>
        )}
      </div>

      {/* Match Counter */}
      {profiles.length > 0 && (
        <div className="text-center pb-4">
          <div className="inline-flex items-center space-x-2 bg-white border shadow-soft rounded-full px-4 py-2">
            <div className="flex space-x-1">
              {profiles.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentMatchIndex ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-muted-foreground text-sm">
              {currentMatchIndex + 1} of {profiles.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;