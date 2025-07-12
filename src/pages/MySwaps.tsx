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
      </div>
    </div>
  );
};

export default MySwaps;