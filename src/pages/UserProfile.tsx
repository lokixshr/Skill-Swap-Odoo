import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

const UserProfile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    getDoc(doc(db, "users", userId)).then((snap) => {
      if (snap.exists()) {
        setUserData(snap.data());
        setNotFound(false);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    });
  }, [userId]);

  if (loading) return <div className="flex items-center justify-center min-h-screen"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>;
  if (notFound) return <div className="flex items-center justify-center min-h-screen text-xl text-muted-foreground">User not found</div>;
  if (!userData) return null;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={userData.avatar} alt={userData.name} />
            <AvatarFallback className="text-3xl">{userData.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-3xl font-bold text-foreground mb-1">{userData.name}</CardTitle>
            <div className="text-muted-foreground mb-2">{userData.email}</div>
            <div className="text-muted-foreground">{userData.location}</div>
            {userData.website && <a href={userData.website} className="text-primary underline block mt-1" target="_blank" rel="noopener noreferrer">{userData.website}</a>}
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="font-semibold mb-1">Bio</div>
            <div className="text-muted-foreground">{userData.bio}</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {(userData.skills || []).length === 0 && <span className="text-muted-foreground">No skills listed.</span>}
            {(userData.skills || []).map((skill: any, idx: number) => (
              <div key={idx} className="p-4 border rounded-lg min-w-[180px]">
                <div className="font-semibold text-foreground mb-1">{skill.name}</div>
                <Badge variant="secondary" className="mb-1">{skill.level}</Badge>
                <div className="text-xs text-muted-foreground">Rating: {skill.rating || "-"}</div>
                <div className="text-xs text-muted-foreground">Students: {skill.students || 0}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile; 