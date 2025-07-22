import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Settings, 
  MapPin, 
  Calendar, 
  Heart, 
  Users, 
  Star, 
  Camera,
  Edit,
  LogOut
} from "lucide-react";

interface ProfilePageProps {
  userType: "participant" | "carer";
  userData: any;
}

const ProfilePage = ({ userType, userData }: ProfilePageProps) => {
  const mockProfileData = {
    name: userData.name || "Alex Johnson",
    age: userData.age || "28",
    location: userData.location || "Sydney, NSW",
    bio: userData.bio || "Passionate about creating meaningful connections and helping others achieve their goals.",
    interests: userData.interests ? userData.interests.split(", ") : ["Music", "Art", "Cooking", "Outdoor activities"],
    joinDate: "January 2024",
    connections: 12,
    rating: 4.9,
    reviews: 23,
  };

  return (
    <div className="min-h-screen bg-gradient-background pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Profile Header */}
      <div className="px-4 mb-6">
        <Card className="border-white/20 bg-gradient-card backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <div className="relative inline-block mb-4">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-primary text-white text-2xl">
                  {mockProfileData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full shadow-lg"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            
            <h2 className="text-2xl font-bold text-foreground mb-1">
              {mockProfileData.name}, {mockProfileData.age}
            </h2>
            
            <div className="flex items-center justify-center text-muted-foreground mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{mockProfileData.location}</span>
            </div>

            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-accent-yellow fill-current" />
                <span className="font-medium">{mockProfileData.rating}</span>
                <span className="text-muted-foreground">({mockProfileData.reviews})</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4 text-accent-pink" />
                <span className="font-medium">{mockProfileData.connections} connections</span>
              </div>
            </div>

            <Badge variant="secondary" className="mb-4">
              {userType === "participant" ? (
                <>
                  <Users className="w-3 h-3 mr-1" />
                  Looking for support
                </>
              ) : (
                <>
                  <Heart className="w-3 h-3 mr-1" />
                  Support provider
                </>
              )}
            </Badge>

            <Button variant="outline" size="sm" className="w-full">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* About Section */}
      <div className="px-4 mb-6">
        <Card className="border-white/20 bg-gradient-card backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {mockProfileData.bio}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Interests/Skills */}
      <div className="px-4 mb-6">
        <Card className="border-white/20 bg-gradient-card backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">
              {userType === "participant" ? "Interests & Hobbies" : "Skills & Specializations"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {mockProfileData.interests.map((interest, index) => (
                <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                  {interest}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Video Introduction */}
      <div className="px-4 mb-6">
        <Card className="border-white/20 bg-gradient-card backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Video Introduction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No video uploaded yet</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              <Camera className="w-4 h-4 mr-2" />
              Add Video Introduction
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Account Settings */}
      <div className="px-4 mb-6">
        <Card className="border-white/20 bg-gradient-card backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Member since</span>
              <span className="text-foreground">{mockProfileData.joinDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Account type</span>
              <Badge variant="secondary">
                {userType === "participant" ? "Participant" : "Carer"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sign Out */}
      <div className="px-4">
        <Button variant="destructive" size="lg" className="w-full">
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;