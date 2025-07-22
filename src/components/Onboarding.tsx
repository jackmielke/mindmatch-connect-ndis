import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, ArrowRight, User } from "lucide-react";

interface OnboardingProps {
  onComplete: (userType: "participant" | "carer", userData: any) => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<"participant" | "carer" | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    bio: "",
    interests: "",
    experience: "",
  });

  const handleUserTypeSelect = (type: "participant" | "carer") => {
    setUserType(type);
    setStep(2);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (userType) {
      onComplete(userType, formData);
    }
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6 animate-slide-up">
          <div className="text-center mb-8">
            <img
              src="/lovable-uploads/1379f33e-4ce5-4b6e-a71b-a65b163b2ad7.png"
              alt="MindMatch"
              className="w-48 mx-auto mb-4"
            />
            <p className="text-white/90 text-lg">
              Welcome to the NDIS community connection
            </p>
          </div>

          <div className="space-y-4">
            <Card 
              className="cursor-pointer hover:shadow-brand transition-all duration-300 hover:scale-[1.02] border-white/20 bg-gradient-card backdrop-blur-sm"
              onClick={() => handleUserTypeSelect("participant")}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent-blue/20 flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-8 h-8 text-accent-blue" />
                </div>
                <CardTitle className="text-xl">I'm looking for support</CardTitle>
                <CardDescription>
                  Connect with caring support workers who understand your needs
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-brand transition-all duration-300 hover:scale-[1.02] border-white/20 bg-gradient-card backdrop-blur-sm"
              onClick={() => handleUserTypeSelect("carer")}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent-pink/20 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-accent-pink" />
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

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-white/20 bg-gradient-card backdrop-blur-sm animate-slide-up">
        <CardHeader className="text-center">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
            <User className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Tell us about yourself</CardTitle>
          <CardDescription>
            Help us create meaningful connections
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="border-white/20 bg-white/10 backdrop-blur-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Age</label>
              <Input
                placeholder="25"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                className="border-white/20 bg-white/10 backdrop-blur-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                placeholder="Sydney, NSW"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="border-white/20 bg-white/10 backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tell us about yourself</label>
            <Textarea
              placeholder="Share what makes you unique..."
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              className="border-white/20 bg-white/10 backdrop-blur-sm min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              {userType === "participant" ? "Interests & Hobbies" : "Skills & Experience"}
            </label>
            <Input
              placeholder={userType === "participant" ? "Music, art, sports..." : "Personal care, cooking, companionship..."}
              value={userType === "participant" ? formData.interests : formData.experience}
              onChange={(e) => handleInputChange(userType === "participant" ? "interests" : "experience", e.target.value)}
              className="border-white/20 bg-white/10 backdrop-blur-sm"
            />
          </div>

          <Button
            onClick={handleSubmit}
            variant="premium"
            size="lg"
            className="w-full mt-6"
            disabled={!formData.name || !formData.bio}
          >
            Start Connecting
            <ArrowRight className="w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;