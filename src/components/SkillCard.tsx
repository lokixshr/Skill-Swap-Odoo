
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock, MessageCircle, User, CheckCircle, Coins, Heart } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface SkillCardProps {
  id: number;
  user: {
    name: string;
    avatar: string;
    rating: number;
  };
  skill: {
    title: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    category: string;
  };
  availability: string;
}

const SkillCard = ({ id, user, skill, availability }: SkillCardProps) => {
  const [isRequested, setIsRequested] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [userCoins] = useState(50); // Mock user coins
  const requestCost = 5; // Cost per swap request
  const { toast } = useToast();
  const navigate = useNavigate();

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "Intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "Advanced":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const handleSwapRequest = async () => {
    if (userCoins < requestCost) {
      toast({
        title: "Insufficient Coins",
        description: `You need ${requestCost} coins to send a swap request. You have ${userCoins} coins.`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call with realistic delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsRequested(true);
    setIsLoading(false);
    
    toast({
      title: "Swap Request Sent! ✨",
      description: `Your request to learn ${skill.title} from ${user.name} has been sent. ${requestCost} coins deducted.`,
      duration: 4000,
    });
  };

  const handleViewProfile = () => {
    navigate(`/user/${id}`);
  };

  const handleMessage = () => {
    navigate(`/messages/${id}`);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from Favorites" : "Added to Favorites",
      description: isFavorited 
        ? `Removed ${user.name}'s ${skill.title} from your favorites`
        : `Added ${user.name}'s ${skill.title} to your favorites`,
    });
  };

  return (
    <Card className="group relative overflow-hidden border border-border hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 bg-card">
      {/* Favorite Button */}
      <Button 
        variant="ghost" 
        size="sm" 
        className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        onClick={handleFavorite}
      >
        <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
      </Button>

      <CardContent className="p-6">
        {/* User Info */}
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-12 w-12 ring-2 ring-primary/10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-card-foreground hover:text-primary transition-colors duration-200 cursor-pointer" onClick={handleViewProfile}>
              {user.name}
            </h3>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-muted-foreground font-medium">{user.rating}</span>
              <span className="text-xs text-muted-foreground ml-2">• Verified</span>
            </div>
          </div>
        </div>

        {/* Skill Details */}
        <div className="space-y-3 mb-4">
          <h4 className="font-bold text-lg text-card-foreground group-hover:text-primary transition-colors duration-200">
            {skill.title}
          </h4>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className={`${getLevelColor(skill.level)} font-medium`}>
              {skill.level}
            </Badge>
            <span className="text-sm text-muted-foreground font-medium">{skill.category}</span>
          </div>
        </div>

        {/* Availability */}
        <div className="flex items-center space-x-2 mb-4 text-sm">
          <Clock className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Available {availability}</span>
        </div>

        {/* Pricing */}
        <div className="flex items-center space-x-2 mb-4 p-2 bg-primary/5 rounded-lg">
          <Coins className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">{requestCost} coins per request</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            variant={isRequested ? "outline" : "default"} 
            className={`w-full transition-all duration-300 font-medium ${
              isRequested 
                ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100 dark:bg-green-900/10 dark:border-green-800 dark:text-green-400" 
                : "hover:shadow-md"
            }`}
            onClick={handleSwapRequest}
            disabled={isLoading || isRequested}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                Sending Request...
              </div>
            ) : isRequested ? (
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Request Sent
              </div>
            ) : (
              <div className="flex items-center">
                <Coins className="h-4 w-4 mr-2" />
                Request Swap ({requestCost} coins)
              </div>
            )}
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 hover:bg-primary/5 hover:border-primary/20 transition-all duration-200" 
              onClick={handleViewProfile}
            >
              <User className="h-3 w-3 mr-1" />
              Profile
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 hover:bg-primary/5 hover:border-primary/20 transition-all duration-200" 
              onClick={handleMessage}
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              Message
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
