import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, MessageCircle, Heart, Clock } from "lucide-react";

const AIHelperPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="p-4 pt-12 bg-white border-b shadow-soft">
        <h1 className="text-2xl font-bold text-foreground mb-2">AI Helper</h1>
        <p className="text-muted-foreground">Your personal connection assistant</p>
      </div>

      {/* Coming Soon Banner */}
      <div className="mx-4 my-6">
        <Card className="border shadow-medium bg-white">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-accent-orange/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-accent-orange" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Coming Soon!</h2>
            <p className="text-muted-foreground">
              Our AI assistant will help you navigate connections, suggest conversation starters, 
              and provide personalized matching insights.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Planned Features */}
      <div className="px-4 space-y-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">What's planned:</h3>
        
        <Card className="border shadow-soft bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-accent-blue/10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-accent-blue" />
              </div>
              <CardTitle className="text-foreground">Smart Conversation Starters</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Get personalized suggestions for meaningful conversations based on shared interests and compatibility.
            </p>
          </CardContent>
        </Card>

        <Card className="border shadow-soft bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-accent-green/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-accent-green" />
              </div>
              <CardTitle className="text-foreground">Connection Insights</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Understand why you're matched with someone and get tips for building stronger connections.
            </p>
          </CardContent>
        </Card>

        <Card className="border shadow-soft bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-foreground">Meeting Scheduler</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              AI-powered scheduling that finds the perfect time and place for both participants and carers.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* CTA */}
      <div className="px-4 mt-8">
        <Card className="border shadow-soft bg-white text-center">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Want early access?
            </h3>
            <p className="text-muted-foreground mb-4">
              Be the first to try our AI features when they launch.
            </p>
            <Button variant="premium" size="lg" className="w-full">
              <Sparkles className="w-5 h-5 mr-2" />
              Notify Me
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIHelperPage;