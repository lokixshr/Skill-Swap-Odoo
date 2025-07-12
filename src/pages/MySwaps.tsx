import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Clock, 
  MessageCircle, 
  Calendar, 
  Star, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Video,
  Users,
  ThumbsUp,
  RotateCcw
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const MySwaps = () => {
  const { toast } = useToast();

  // Mock data for active swaps
  const activeSwaps = [
    {
      id: 1,
      partner: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b67c?w=100&h=100&fit=crop&crop=face",
        rating: 4.9
      },
      skill: "React Development",
      mySkill: "Guitar Lessons",
      status: "pending",
      requestDate: "2024-01-15",
      message: "Hi! I'd love to learn guitar in exchange for React tutoring."
    },
    {
      id: 2,
      partner: {
        name: "Marcus Johnson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        rating: 4.7
      },
      skill: "UI/UX Design",
      mySkill: "Web Development",
      status: "accepted",
      requestDate: "2024-01-12",
      message: "Looking forward to our design sessions!"
    },
    {
      id: 3,
      partner: {
        name: "Elena Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        rating: 4.8
      },
      skill: "Python Programming",
      mySkill: "Digital Marketing",
      status: "declined",
      requestDate: "2024-01-10",
      message: "Sorry, my schedule is too busy right now."
    }
  ];

  // Mock data for upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      partner: {
        name: "Marcus Johnson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
      },
      skill: "UI/UX Design",
      date: "2024-01-20",
      time: "2:00 PM",
      duration: "1 hour",
      format: "Video Call",
      meetingLink: "https://meet.example.com/abc123"
    },
    {
      id: 2,
      partner: {
        name: "Aisha Patel",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
      },
      skill: "Data Science",
      date: "2024-01-22",
      time: "4:00 PM",
      duration: "1.5 hours",
      format: "In Person",
      location: "Central Library"
    }
  ];

  // Mock data for past swaps
  const pastSwaps = [
    {
      id: 1,
      partner: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        rating: 4.6
      },
      skill: "Digital Marketing",
      mySkill: "Web Development",
      completedDate: "2024-01-05",
      sessions: 3,
      myRating: null,
      partnerRating: 4.8,
      feedback: "Great teacher! Very patient and knowledgeable."
    },
    {
      id: 2,
      partner: {
        name: "Tom Wilson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        rating: 4.5
      },
      skill: "Guitar Lessons",
      mySkill: "Photography",
      completedDate: "2024-01-02",
      sessions: 5,
      myRating: 5,
      partnerRating: 4.9,
      feedback: "Amazing photography skills! Learned so much."
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
          <AlertCircle className="h-3 w-3 mr-1" />
          Pending
        </Badge>;
      case "accepted":
        return <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
          <CheckCircle className="h-3 w-3 mr-1" />
          Accepted
        </Badge>;
      case "declined":
        return <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
          <XCircle className="h-3 w-3 mr-1" />
          Declined
        </Badge>;
      default:
        return null;
    }
  };

  const handleJoinSession = (sessionId: number) => {
    toast({
      title: "Joining Session",
      description: "Redirecting to meeting room...",
    });
  };

  const handleReschedule = (sessionId: number) => {
    toast({
      title: "Reschedule Request",
      description: "Sending reschedule request to your partner...",
    });
  };

  const handleRate = (swapId: number, rating: number) => {
    toast({
      title: "Rating Submitted",
      description: `You rated this swap ${rating} stars. Thank you for your feedback!`,
    });
  };

  const handleEndorse = (swapId: number) => {
    toast({
      title: "Endorsement Sent",
      description: "Your endorsement has been added to their profile!",
    });
  };

  return (
    <div className="pt-20 pb-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Swaps</h1>
          <p className="text-lg text-muted-foreground">
            Manage your skill exchanges and sessions
          </p>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active" className="transition-all duration-200">
              Active Swaps ({activeSwaps.length})
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="transition-all duration-200">
              Upcoming Sessions ({upcomingSessions.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="transition-all duration-200">
              Past Swaps ({pastSwaps.length})
            </TabsTrigger>
          </TabsList>

          {/* Active Swaps Tab */}
          <TabsContent value="active" className="space-y-6 mt-6">
            {activeSwaps.map((swap) => (
              <Card key={swap.id} className="shadow-card hover:shadow-card-hover transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={swap.partner.avatar} alt={swap.partner.name} />
                        <AvatarFallback>{swap.partner.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{swap.partner.name}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          {swap.partner.rating}
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(swap.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Learning</p>
                        <p className="font-medium">{swap.skill}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Teaching</p>
                        <p className="font-medium">{swap.mySkill}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Message</p>
                      <p className="text-sm bg-muted/50 p-3 rounded-lg">{swap.message}</p>
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      Requested on {new Date(swap.requestDate).toLocaleDateString()}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                      {swap.status === "accepted" && (
                        <Button variant="default" size="sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          Schedule Session
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {activeSwaps.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground mb-2">No active swaps yet</p>
                <p className="text-sm text-muted-foreground">Start browsing skills to find your first exchange partner!</p>
              </div>
            )}
          </TabsContent>

          {/* Upcoming Sessions Tab */}
          <TabsContent value="upcoming" className="space-y-6 mt-6">
            {upcomingSessions.map((session) => (
              <Card key={session.id} className="shadow-card hover:shadow-card-hover transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={session.partner.avatar} alt={session.partner.name} />
                        <AvatarFallback>{session.partner.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{session.skill}</CardTitle>
                        <p className="text-sm text-muted-foreground">with {session.partner.name}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400">
                      <Clock className="h-3 w-3 mr-1" />
                      Upcoming
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-muted-foreground">Date</p>
                        <p>{new Date(session.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Time</p>
                        <p>{session.time}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Duration</p>
                        <p>{session.duration}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Format</p>
                        <p>{session.format}</p>
                      </div>
                    </div>

                    {session.meetingLink && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <p className="text-sm font-medium text-blue-800 dark:text-blue-400 mb-1">Meeting Link</p>
                        <p className="text-sm text-blue-600 dark:text-blue-300 font-mono">{session.meetingLink}</p>
                      </div>
                    )}

                    {session.location && (
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <p className="text-sm font-medium text-green-800 dark:text-green-400 mb-1">Location</p>
                        <p className="text-sm text-green-600 dark:text-green-300">{session.location}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleJoinSession(session.id)}
                      >
                        <Video className="h-4 w-4 mr-1" />
                        {session.format === "Video Call" ? "Join Session" : "View Details"}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleReschedule(session.id)}
                      >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Reschedule
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {upcomingSessions.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground mb-2">No upcoming sessions</p>
                <p className="text-sm text-muted-foreground">Schedule sessions with your active swap partners!</p>
              </div>
            )}
          </TabsContent>

          {/* Past Swaps Tab */}
          <TabsContent value="past" className="space-y-6 mt-6">
            {pastSwaps.map((swap) => (
              <Card key={swap.id} className="shadow-card hover:shadow-card-hover transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={swap.partner.avatar} alt={swap.partner.name} />
                        <AvatarFallback>{swap.partner.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{swap.partner.name}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          {swap.partner.rating}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-900/20 dark:border-gray-700 dark:text-gray-400">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-muted-foreground">Learned</p>
                        <p>{swap.skill}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Taught</p>
                        <p>{swap.mySkill}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Sessions</p>
                        <p>{swap.sessions} completed</p>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm font-medium mb-1">Partner's Feedback</p>
                      <p className="text-sm">{swap.feedback}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        Completed on {new Date(swap.completedDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center space-x-2">
                        {swap.partnerRating && (
                          <div className="flex items-center text-sm">
                            <span className="text-muted-foreground mr-1">They rated you:</span>
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{swap.partnerRating}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {!swap.myRating && (
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <Button
                              key={rating}
                              variant="outline"
                              size="sm"
                              onClick={() => handleRate(swap.id, rating)}
                              className="p-2 h-8 w-8"
                            >
                              <Star className="h-3 w-3" />
                            </Button>
                          ))}
                        </div>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEndorse(swap.id)}
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Endorse
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {pastSwaps.length === 0 && (
              <div className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground mb-2">No completed swaps yet</p>
                <p className="text-sm text-muted-foreground">Your completed exchanges will appear here!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MySwaps;