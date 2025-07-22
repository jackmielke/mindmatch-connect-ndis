import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake, Users, ArrowRight, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";

const PARTICIPANT_INTERESTS = [
  "Music", "Art", "Sports", "Reading", "Movies", "Cooking", "Gaming", "Photography",
  "Dancing", "Swimming", "Hiking", "Yoga", "Crafts", "Gardening", "Animals", "Travel",
  "Technology", "Board Games", "Puzzles", "Writing", "Singing", "Drawing", "Fishing"
];

const CARER_SKILLS = [
  "Personal Care", "Cooking", "Cleaning", "Companionship", "Transportation", "Shopping",
  "Medication Support", "Exercise Support", "Social Activities", "Hobby Support",
  "Technology Help", "Reading Support", "Music Therapy", "Art Therapy", "Pet Care",
  "Gardening", "Life Skills", "Communication", "Behavioral Support", "Respite Care"
];

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<"participant" | "carer" | null>(null);
  const [loading, setLoading] = useState(false);
  const { signInAnonymously, user } = useAuth();
  const { createProfile } = useProfile();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    bio: "",
    interests: [] as string[],
    experience: [] as string[],
    instagram: "",
    facebook: "",
    tiktok: "",
    snapchat: "",
  });

  const handleUserTypeSelect = (type: "participant" | "carer") => {
    setUserType(type);
    setStep(2);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSelection = (item: string, field: 'interests' | 'experience') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    if (!userType) return;
    
    setLoading(true);
    try {
      // Sign in anonymously first if not already authenticated
      if (!user) {
        await signInAnonymously();
        // Wait a bit for the auth state to update
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // Create profile
      await createProfile({
        ...formData,
        user_type: userType,
      });
      
      toast.success("Profile created successfully!");
      onComplete();
    } catch (error) {
      console.error('Error creating profile:', error);
      toast.error("Failed to create profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 1: User Type Selection
  if (step === 1) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6 animate-slide-up">
          <div className="text-center mb-8">
            <img
              src="/lovable-uploads/1379f33e-4ce5-4b6e-a71b-a65b163b2ad7.png"
              alt="MindMatch"
              className="w-48 mx-auto mb-4"
            />
            <p className="text-muted-foreground text-lg">
              Welcome to the NDIS community connection
            </p>
          </div>

          <div className="space-y-4">
            <Card 
              className="cursor-pointer hover:shadow-medium transition-all duration-200 hover:scale-[1.01] border shadow-soft bg-white"
              onClick={() => handleUserTypeSelect("participant")}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent-blue/10 flex items-center justify-center mx-auto mb-3">
                  <Handshake className="w-8 h-8 text-accent-blue" />
                </div>
                <CardTitle className="text-xl">I need support</CardTitle>
                <CardDescription>
                  Connect with qualified support workers who understand your needs
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-medium transition-all duration-200 hover:scale-[1.01] border shadow-soft bg-white"
              onClick={() => handleUserTypeSelect("carer")}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent-green/10 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-accent-green" />
                </div>
                <CardTitle className="text-xl">I provide support</CardTitle>
                <CardDescription>
                  Share your skills and connect with participants who need your help
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Interests & Hobbies / Skills & Experience
  if (step === 2) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md border shadow-medium bg-white animate-slide-up">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <User className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">
              {userType === "participant" ? "Your Interests & Hobbies" : "Your Skills & Experience"}
            </CardTitle>
            <CardDescription>
              {userType === "participant" 
                ? "What do you enjoy doing in your free time?"
                : "What support skills do you have to offer?"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground mb-3">
                Select all that apply - click to add or remove
              </p>
              <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
                {(userType === "participant" ? PARTICIPANT_INTERESTS : CARER_SKILLS).map((item) => {
                  const isSelected = userType === "participant" 
                    ? formData.interests.includes(item)
                    : formData.experience.includes(item);
                  
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleSelection(item, userType === "participant" ? "interests" : "experience")}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              onClick={handleNext}
              variant="premium"
              size="lg"
              className="w-full mt-6"
              disabled={userType === "participant" ? formData.interests.length === 0 : formData.experience.length === 0}
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Step 3: Personal Info & Social Media
  if (step === 3) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md border shadow-medium bg-white animate-slide-up">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <User className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Personal Details</CardTitle>
            <CardDescription>
              Help others get to know you better
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name *</label>
              <Input
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Age</label>
                <Input
                  placeholder="25"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  placeholder="Sydney, NSW"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Social Media (Optional)</label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Instagram"
                  value={formData.instagram}
                  onChange={(e) => handleInputChange("instagram", e.target.value)}
                />
                <Input
                  placeholder="Facebook"
                  value={formData.facebook}
                  onChange={(e) => handleInputChange("facebook", e.target.value)}
                />
                <Input
                  placeholder="TikTok"
                  value={formData.tiktok}
                  onChange={(e) => handleInputChange("tiktok", e.target.value)}
                />
                <Input
                  placeholder="Snapchat"
                  value={formData.snapchat}
                  onChange={(e) => handleInputChange("snapchat", e.target.value)}
                />
              </div>
            </div>

            <Button
              onClick={handleNext}
              variant="premium"
              size="lg"
              className="w-full mt-6"
              disabled={!formData.name}
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Step 4: Tell us about yourself
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border shadow-medium bg-white animate-slide-up">
        <CardHeader className="text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <User className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Tell us about yourself</CardTitle>
          <CardDescription>
            Share what makes you unique and what you're looking for
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">About you *</label>
            <Textarea
              placeholder="Share what makes you unique, your goals, and what kind of connections you're looking for..."
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <Button
            onClick={handleSubmit}
            variant="premium"
            size="lg"
            className="w-full mt-6"
            disabled={loading || !formData.bio}
          >
            {loading ? "Creating Profile..." : "Start Connecting"}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;