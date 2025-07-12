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
<<<<<<< HEAD
  RotateCcw,
  Plus,
  X,
  Loader2,
  User as UserIcon,
  Calendar as CalendarIcon,
  MessageCircle as MessageIcon,
  Info,
  RefreshCcw
} from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, getDocs, query, where, updateDoc, doc, getDoc } from "firebase/firestore";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-blue-100 text-blue-800">Active</Badge>;
    case "upcoming":
      return <Badge className="bg-yellow-100 text-yellow-800">Upcoming</Badge>;
    case "past":
      return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
  }
};

// SwapCard component for maintainability
const SwapCard = memo(function SwapCard({ swap, partner, status, onProfile, onMessage, onReschedule }: any) {
  return (
    <Card className="shadow-card rounded-xl border border-border bg-card transition-all duration-200 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary/40">
      <CardContent className="p-6 flex flex-col gap-5">
        <div className="flex items-center gap-4 pb-2 border-b border-border/20">
          <Avatar className="h-12 w-12">
            <AvatarImage src={partner?.avatar} />
            <AvatarFallback>{partner?.name?.charAt(0) || <UserIcon className="h-6 w-6" />}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-lg truncate">{swap.offering} ↔ {swap.requesting}</div>
            <div className="text-muted-foreground text-sm flex items-center gap-1">
              <CalendarIcon className="h-4 w-4 inline-block mr-1" />
              {swap.date && new Date(swap.date).toLocaleString()}
            </div>
            {partner && <div className="text-sm text-foreground font-medium mt-1 flex items-center gap-1">
              <UserIcon className="h-4 w-4 inline-block mr-1" />
              {partner.name}
            </div>}
          </div>
          {getStatusBadge(status)}
        </div>
        {swap.description && <div className="text-muted-foreground text-sm italic"><Info className="h-4 w-4 inline-block mr-1" />{swap.description}</div>}
        <a href={swap.meet} target="_blank" rel="noopener noreferrer" className="text-primary underline text-sm">Join Google Meet</a>
        <div className="flex gap-2 mt-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button aria-label="View Profile" variant="ghost" size="icon" onClick={onProfile}><UserIcon className="h-5 w-5" /></Button>
            </TooltipTrigger>
            <TooltipContent>View Profile</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button aria-label="Message" variant="ghost" size="icon" onClick={onMessage}><MessageIcon className="h-5 w-5" /></Button>
            </TooltipTrigger>
            <TooltipContent>Message</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button aria-label="Reschedule" variant="ghost" size="icon" onClick={onReschedule}><RefreshCcw className="h-5 w-5" /></Button>
            </TooltipTrigger>
            <TooltipContent>Reschedule</TooltipContent>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
});

const MySwaps = () => {
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [showReschedule, setShowReschedule] = useState<{open: boolean, swapId: string | null}>({open: false, swapId: null});
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [swaps, setSwaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    offering: "",
    requesting: "",
    date: "",
    meet: ""
  });
  const [formError, setFormError] = useState("");
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const [partnerInfo, setPartnerInfo] = useState<Record<string, { name: string; avatar: string }>>({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    setLoading(true);
    const q = query(collection(db, "swaps"), where("participants", "array-contains", currentUser.uid));
    getDocs(q).then((snap) => {
      setSwaps(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
  }, [currentUser, saving]);

  // Fetch partner info for all swaps
  useEffect(() => {
    if (!swaps.length) return;
    const fetchPartners = async () => {
      const info: Record<string, { name: string; avatar: string }> = {};
      for (const swap of swaps) {
        const otherUserId = swap.participants?.find((uid: string) => uid !== currentUser?.uid);
        if (otherUserId && !info[otherUserId]) {
          try {
            const snap = await getDoc(doc(db, "users", otherUserId));
            if (snap.exists()) {
              const data = snap.data();
              info[otherUserId] = {
                name: data.name || "Unknown User",
                avatar: data.avatar || `https://ui-avatars.com/api/?name=${data.name || 'U'}&background=random`,
              };
            } else {
              info[otherUserId] = {
                name: "Unknown User",
                avatar: `https://ui-avatars.com/api/?name=U&background=random`,
              };
            }
          } catch {
            info[otherUserId] = {
              name: "Unknown User",
              avatar: `https://ui-avatars.com/api/?name=U&background=random`,
            };
          }
        }
      }
      setPartnerInfo(info);
    };
    fetchPartners();
  }, [swaps, currentUser]);

  const handleCreateSwap = async (e: any) => {
    e.preventDefault();
    if (!form.offering || !form.requesting || !form.date || !form.meet) {
      setFormError("Please provide all fields, including a Google Meet link.");
      return;
    }
    setFormError("");
    setSaving(true);
    await addDoc(collection(db, "swaps"), {
      offering: form.offering,
      requesting: form.requesting,
      date: form.date,
      meet: form.meet,
      participants: [currentUser.uid],
      createdAt: new Date()
    });
    setSaving(false);
    setShowModal(false);
    setForm({ offering: "", requesting: "", date: "", meet: "" });
  };

  const handleReschedule = async (swapId: string) => {
    if (!rescheduleDate) return;
    setSaving(true);
    await updateDoc(doc(db, "swaps", swapId), { date: rescheduleDate });
    setSaving(false);
    setShowReschedule({ open: false, swapId: null });
    setRescheduleDate("");
    // TODO: Trigger email notification here
=======
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
>>>>>>> 0ce1cdd4107b5a3b523a7b613d4f6a9d2460daf0
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

<<<<<<< HEAD
  // Helper to determine swap status
  const getSwapStatus = (swap: any) => {
    const now = new Date();
    const swapDate = swap.date ? new Date(swap.date) : null;
    if (!swapDate) return "active";
    if (swapDate > now) return "upcoming";
    if (swapDate < now) return "past";
    return "active";
  };

  // Only allow one modal open at a time
  const openPostModal = () => {
    setShowReschedule({ open: false, swapId: null });
    setShowModal(true);
  };
  const openRescheduleModal = (swapId: string) => {
    setShowModal(false);
    setShowReschedule({ open: true, swapId });
  };

  return (
    <div className="pt-20 pb-12 min-h-screen bg-background">
      {/* Floating Action Button */}
      <button
        className="fixed bottom-8 right-8 bg-primary text-primary-foreground rounded-full shadow-lg w-14 h-14 flex items-center justify-center text-2xl hover:bg-primary-hover transition-all z-50"
        onClick={openPostModal}
        aria-label="Post New Swap"
      >
        <Plus />
      </button>
      {/* New Swap Modal */}
      <Dialog open={showModal} onOpenChange={(open) => { if (!open) setShowModal(false); }}>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 transition-all">
            <Card className="w-full max-w-md shadow-card rounded-xl relative animate-fade-in">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-2xl font-bold">Post a New Skill Swap</CardTitle>
                <button className="text-muted-foreground hover:text-foreground" onClick={() => setShowModal(false)}><X /></button>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <form onSubmit={handleCreateSwap} className="space-y-5">
                  <div>
                    <label className="block mb-1 font-medium">Skill Offering</label>
                    <Input value={form.offering} onChange={e => setForm(f => ({ ...f, offering: e.target.value }))} required className="bg-muted/40" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Skill Requesting</label>
                    <Input value={form.requesting} onChange={e => setForm(f => ({ ...f, requesting: e.target.value }))} required className="bg-muted/40" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Date & Time</label>
                    <Input type="datetime-local" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required className="bg-muted/40" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Google Meet Link</label>
                    <Input value={form.meet} onChange={e => setForm(f => ({ ...f, meet: e.target.value }))} required className="bg-muted/40" />
                  </div>
                  {formError && <div className="text-red-500 text-sm text-center">{formError}</div>}
                  <Button type="submit" className="w-full text-base font-semibold" disabled={saving}>
                    {saving ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : "Post Swap"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </Dialog>
      {/* Reschedule Modal */}
      <Dialog open={showReschedule.open} onOpenChange={(open) => { if (!open) setShowReschedule({ open: false, swapId: null }); }}>
        {showReschedule.open && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 transition-all">
            <Card className="w-full max-w-md shadow-card rounded-xl relative animate-fade-in">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-2xl font-bold">Reschedule Swap</CardTitle>
                <button className="text-muted-foreground hover:text-foreground" onClick={() => setShowReschedule({ open: false, swapId: null })}><X /></button>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <label className="block mb-1 font-medium">New Date & Time</label>
                <Input type="datetime-local" value={rescheduleDate} onChange={e => setRescheduleDate(e.target.value)} required className="bg-muted/40" />
                <Button onClick={() => handleReschedule(showReschedule.swapId!)} className="w-full mt-6 text-base font-semibold" disabled={saving}>
                  {saving ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : "Confirm Reschedule"}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </Dialog>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8 border-b border-border pb-6 flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold text-foreground mb-0 tracking-tight">My Swaps</h1>
          <p className="text-lg text-muted-foreground">Manage your skill exchanges and sessions</p>
        </div>
        <div className="bg-card rounded-xl shadow-card p-6 mb-10">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 gap-2 bg-muted/40 rounded-lg p-1">
              <TabsTrigger value="active" className="font-bold text-lg py-3 rounded-md">Active Swaps ({swaps.filter(s => getSwapStatus(s)==='active').length})</TabsTrigger>
              <TabsTrigger value="upcoming" className="font-bold text-lg py-3 rounded-md">Upcoming Sessions ({swaps.filter(s => getSwapStatus(s)==='upcoming').length})</TabsTrigger>
              <TabsTrigger value="past" className="font-bold text-lg py-3 rounded-md">Past Swaps ({swaps.filter(s => getSwapStatus(s)==='past').length})</TabsTrigger>
            </TabsList>
            {/* Active Swaps Tab */}
            <TabsContent value="active" className="mt-2">
              {loading ? <Loader2 className="animate-spin h-8 w-8 mx-auto my-20 text-primary" /> : null}
              {swaps.filter(s => getSwapStatus(s)==='active').length === 0 && !loading && (
                <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
                  <MessageCircle className="h-14 w-14 text-muted-foreground mb-4" />
                  <div className="text-xl font-semibold mb-1">No active swaps</div>
                  <div className="text-muted-foreground mb-2">Click the + button to post a new swap!</div>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {swaps.filter(s => getSwapStatus(s)==='active').map((swap) => {
                  const otherUserId = swap.participants?.find((uid: string) => uid !== currentUser?.uid) || "";
                  const partner = partnerInfo[otherUserId];
                  return (
                    <SwapCard
                      key={swap.id}
                      swap={swap}
                      partner={partner}
                      status={getSwapStatus(swap)}
                      onProfile={() => navigate(`/user/${otherUserId}`)}
                      onMessage={() => navigate(`/messages/${otherUserId}`)}
                      onReschedule={() => openRescheduleModal(swap.id)}
                    />
                  );
                })}
              </div>
            </TabsContent>
            {/* Upcoming Sessions Tab */}
            <TabsContent value="upcoming" className="mt-2">
              {swaps.filter(s => getSwapStatus(s)==='upcoming').length === 0 && !loading && (
                <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
                  <CalendarIcon className="h-14 w-14 text-muted-foreground mb-4" />
                  <div className="text-xl font-semibold mb-1">No upcoming sessions</div>
                  <div className="text-muted-foreground">Schedule sessions with your active swap partners!</div>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {swaps.filter(s => getSwapStatus(s)==='upcoming').map((swap) => {
                  const otherUserId = swap.participants?.find((uid: string) => uid !== currentUser?.uid) || "";
                  const partner = partnerInfo[otherUserId];
                  return (
                    <SwapCard
                      key={swap.id}
                      swap={swap}
                      partner={partner}
                      status={getSwapStatus(swap)}
                      onProfile={() => navigate(`/user/${otherUserId}`)}
                      onMessage={() => navigate(`/messages/${otherUserId}`)}
                      onReschedule={() => openRescheduleModal(swap.id)}
                    />
                  );
                })}
              </div>
            </TabsContent>
            {/* Past Swaps Tab */}
            <TabsContent value="past" className="mt-2">
              {swaps.filter(s => getSwapStatus(s)==='past').length === 0 && !loading && (
                <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
                  <CheckCircle className="h-14 w-14 text-muted-foreground mb-4" />
                  <div className="text-xl font-semibold mb-1">No completed swaps yet</div>
                  <div className="text-muted-foreground">Your completed exchanges will appear here!</div>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {swaps.filter(s => getSwapStatus(s)==='past').map((swap) => {
                  const otherUserId = swap.participants?.find((uid: string) => uid !== currentUser?.uid) || "";
                  const partner = partnerInfo[otherUserId];
                  return (
                    <SwapCard
                      key={swap.id}
                      swap={swap}
                      partner={partner}
                      status={getSwapStatus(swap)}
                      onProfile={() => navigate(`/user/${otherUserId}`)}
                      onMessage={() => navigate(`/messages/${otherUserId}`)}
                      onReschedule={() => openRescheduleModal(swap.id)}
                    />
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
=======
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
>>>>>>> 0ce1cdd4107b5a3b523a7b613d4f6a9d2460daf0
      </div>
    </div>
  );
};

export default MySwaps;