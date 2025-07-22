import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, X, MapPin, Clock, Star } from "lucide-react";

interface MatchCardProps {
  name: string;
  age: number;
  location: string;
  bio: string;
  interests: string[];
  image?: string;
  userType: "participant" | "carer";
  onLike: () => void;
  onPass: () => void;
}

const MatchCard = ({ 
  name, 
  age, 
  location, 
  bio, 
  interests, 
  image, 
  userType,
  onLike, 
  onPass 
}: MatchCardProps) => {
  return (
    <Card className="w-full max-w-sm mx-auto border shadow-medium bg-white">
      <CardContent className="p-0">
        {/* Profile Image */}
        <div className="aspect-square bg-gradient-to-br from-primary-light to-accent-blue/10 flex items-center justify-center text-6xl font-bold text-primary rounded-t-lg">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover rounded-t-lg" />
          ) : (
            name.charAt(0).toUpperCase()
          )}
        </div>

        {/* Profile Info */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-foreground">{name}, {age}</h3>
              <div className="flex items-center space-x-1 text-accent-orange">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">4.9</span>
              </div>
            </div>
            
            <div className="flex items-center text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{location}</span>
            </div>

            <div className="flex items-center text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              <span className="text-sm">Available weekdays</span>
            </div>
          </div>

          <p className="text-foreground/80 text-sm leading-relaxed">{bio}</p>

          {/* Interests/Skills */}
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">
              {userType === "participant" ? "Interests" : "Specializes in"}
            </h4>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="decline"
              size="lg"
              className="flex-1"
              onClick={onPass}
            >
              <X className="w-5 h-5" />
              Pass
            </Button>
            <Button
              variant="request"
              size="lg"
              className="flex-1"
              onClick={onLike}
            >
              <UserCheck className="w-5 h-5" />
              Send Request
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchCard;