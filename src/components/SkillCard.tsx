import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, MessageCircle, User, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
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
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsRequested(true);
    setIsLoading(false);
    
    toast({
      title: "Swap Request Sent! ✨",
      description: `Your request to learn ${skill.title} from ${user.name} has been sent.`,
      duration: 3000,
    });
  };

  const handleViewProfile = () => {
    toast({
      title: "Profile View",
      description: `Viewing ${user.name}'s profile...`,
    });
  };

  const handleMessage = () => {
    toast({
      title: "Message Sent",
      description: `Opening chat with ${user.name}...`,
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group">
      {/* User Info */}
      <div className="flex items-center space-x-3 mb-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-medium text-card-foreground">{user.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground">{user.rating}</span>
          </div>
        </div>
      </div>

      {/* Skill Details */}
      <div className="space-y-3 mb-4">
        <h4 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors duration-200">
          {skill.title}
        </h4>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className={getLevelColor(skill.level)}>
            {skill.level}
          </Badge>
          <span className="text-sm text-muted-foreground">{skill.category}</span>
        </div>
      </div>

      {/* Availability */}
      <div className="flex items-center space-x-2 mb-4 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span>{availability}</span>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button 
          variant={isRequested ? "outline" : "default"} 
          className={`w-full transition-all duration-300 ${
            isRequested 
              ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100 dark:bg-green-900/10 dark:border-green-800 dark:text-green-400" 
              : ""
          }`}
          onClick={handleSwapRequest}
          disabled={isLoading || isRequested}
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
              Sending...
            </div>
          ) : isRequested ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Request Sent
            </div>
          ) : (
            "Request Swap"
          )}
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={handleViewProfile}>
            <User className="h-3 w-3 mr-1" />
            Profile
          </Button>
          <Button variant="outline" size="sm" className="flex-1" onClick={handleMessage}>
            <MessageCircle className="h-3 w-3 mr-1" />
            Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;