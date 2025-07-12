import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Coins, Clock, Users, Star, Plus, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const userStats = {
    skillCoins: 150,
    totalSwaps: 23,
    averageRating: 4.8,
    hoursLearned: 45,
  };

  const recentSwaps = [
    {
      id: 1,
      partner: "Sarah Chen",
      partnerAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b67c?w=100&h=100&fit=crop&crop=face",
      skillOffered: "Guitar Lessons",
      skillReceived: "React Development",
      status: "Completed",
      date: "2 days ago",
    },
    {
      id: 2,
      partner: "Marcus Johnson",
      partnerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      skillOffered: "Web Design",
      skillReceived: "UI/UX Design",
      status: "In Progress",
      date: "1 week ago",
    },
    {
      id: 3,
      partner: "Elena Rodriguez",
      partnerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      skillOffered: "Marketing Strategy",
      skillReceived: "Python Programming",
      status: "Scheduled",
      date: "Next Tuesday",
    },
  ];

  const mySkills = [
    { name: "Guitar Lessons", level: "Advanced", students: 12 },
    { name: "Web Design", level: "Intermediate", students: 8 },
    { name: "Marketing Strategy", level: "Beginner", students: 3 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Scheduled":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Track your learning journey and skill exchanges
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-card hover:shadow-card-hover transition-all duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Coins className="h-4 w-4 mr-2 text-yellow-500" />
              Skill Coins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{userStats.skillCoins}</div>
            <p className="text-xs text-muted-foreground">+12 this week</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-card-hover transition-all duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Users className="h-4 w-4 mr-2 text-blue-500" />
              Total Swaps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{userStats.totalSwaps}</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-card-hover transition-all duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Star className="h-4 w-4 mr-2 text-purple-500" />
              Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{userStats.averageRating}</div>
            <p className="text-xs text-muted-foreground">Excellent rating</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-card-hover transition-all duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Clock className="h-4 w-4 mr-2 text-green-500" />
              Hours Learned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{userStats.hoursLearned}</div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Swaps */}
        <div className="lg:col-span-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Swaps
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSwaps.map((swap) => (
                  <div key={swap.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={swap.partnerAvatar} alt={swap.partner} />
                        <AvatarFallback>{swap.partner.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{swap.partner}</p>
                        <p className="text-sm text-muted-foreground">
                          {swap.skillOffered} ↔ {swap.skillReceived}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(swap.status)}>
                        {swap.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{swap.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* My Skills */}
          <Card className="shadow-card mt-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                My Skills
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Skill
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mySkills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{skill.name}</p>
                      <p className="text-sm text-muted-foreground">Level: {skill.level}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">{skill.students}</p>
                      <p className="text-xs text-muted-foreground">students</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar */}
        <div>
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                Availability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border pointer-events-auto"
              />
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Next session:</span>
                  <span className="font-medium">Tomorrow, 2 PM</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Available slots:</span>
                  <span className="font-medium">3 this week</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Manage Schedule
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
