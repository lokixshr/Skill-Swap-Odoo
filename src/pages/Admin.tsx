import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Search,
  MoreVertical,
  Eye,
  Shield,
  Ban
} from "lucide-react";

const Admin = () => {
  const stats = {
    totalUsers: 1247,
    activeSwaps: 89,
    completedSwaps: 456,
    flaggedContent: 3,
  };

  const recentUsers = [
    {
      id: 1,
      name: "Alex Thompson",
      email: "alex@example.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      joinDate: "2024-01-15",
      status: "Active",
      swaps: 12,
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b67c?w=100&h=100&fit=crop&crop=face",
      joinDate: "2024-01-14",
      status: "Active",
      swaps: 8,
    },
    {
      id: 3,
      name: "John Stevens",
      email: "john@example.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      joinDate: "2024-01-13",
      status: "Flagged",
      swaps: 3,
    },
  ];

  const flaggedReports = [
    {
      id: 1,
      reporter: "Sarah Chen",
      reported: "Mike Wilson",
      type: "Inappropriate Content",
      description: "User posted inappropriate material in skill description",
      date: "2024-01-15",
      status: "Pending",
    },
    {
      id: 2,
      reporter: "David Kim",
      reported: "Jane Doe",
      type: "No-Show",
      description: "User consistently fails to show up for scheduled sessions",
      date: "2024-01-14",
      status: "Under Review",
    },
    {
      id: 3,
      reporter: "Lisa Rodriguez",
      reported: "Tom Brown",
      type: "Spam",
      description: "User sending unsolicited promotional messages",
      date: "2024-01-13",
      status: "Resolved",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Flagged":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Under Review":
        return "bg-blue-100 text-blue-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-lg text-muted-foreground">
            Manage users, monitor activity, and maintain platform quality
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Users className="h-4 w-4 mr-2 text-blue-500" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">+23 this week</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                Active Swaps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.activeSwaps}</div>
              <p className="text-xs text-muted-foreground">+12 today</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-purple-500" />
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.completedSwaps}</div>
              <p className="text-xs text-muted-foreground">+8 today</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                Flagged Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.flaggedContent}</div>
              <p className="text-xs text-muted-foreground">Needs attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="reports">Reports & Moderation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search users..." className="pl-10" />
                  </div>
                  <Button variant="outline">Export</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-200">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <p className="text-xs text-muted-foreground">Joined: {user.joinDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{user.swaps} swaps</p>
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Shield className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Ban className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Flagged Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {flaggedReports.map((report) => (
                    <div key={report.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-medium text-foreground">{report.type}</p>
                          <p className="text-sm text-muted-foreground">
                            Reported by {report.reporter} • {report.date}
                          </p>
                        </div>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Reported User: {report.reported}</p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Review
                          </Button>
                          <Button variant="default" size="sm">
                            Take Action
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Chart placeholder - User registration trends</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Swap Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Chart placeholder - Daily swap volume</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Popular Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["React Development", "UI/UX Design", "Python Programming", "Digital Marketing", "Data Science"].map((skill, index) => (
                      <div key={skill} className="flex items-center justify-between">
                        <span className="text-sm">{skill}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 h-2 bg-muted rounded-full">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${(5 - index) * 20}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{100 - index * 15}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Platform Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Rating</span>
                      <span className="font-medium">4.7/5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Completion Rate</span>
                      <span className="font-medium">94%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">User Retention</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Report Resolution</span>
                      <span className="font-medium">&lt; 24 hrs</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;