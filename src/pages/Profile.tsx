
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
<<<<<<< HEAD
import { User, Mail, Phone, MapPin, Edit, Save, Camera, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type ProfileErrors = {
  name?: string;
  email?: string;
  phone?: string;
  website?: string;
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<ProfileErrors>({});
=======
import { User, Mail, Phone, MapPin, Edit, Save, Camera } from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
>>>>>>> 0ce1cdd4107b5a3b523a7b613d4f6a9d2460daf0
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
<<<<<<< HEAD
    website: "",
    bio: "Passionate learner and teacher. I love sharing knowledge about web development and learning new skills from others in the community.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  });
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([
    { name: "React Development", level: "Advanced", rating: 4.8, students: 15 },
    { name: "Guitar Lessons", level: "Intermediate", rating: 4.6, students: 8 },
    { name: "Photography", level: "Beginner", rating: 4.2, students: 3 },
  ]);
  const [skillsLoading, setSkillsLoading] = useState(false);
  const [skillErrors, setSkillErrors] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfileData({ ...profileData, ...docSnap.data(), email: firebaseUser.email, name: firebaseUser.displayName || docSnap.data().name });
          if (docSnap.data().skills) setSkills(docSnap.data().skills);
        } else {
          setProfileData((prev) => ({ ...prev, email: firebaseUser.email, name: firebaseUser.displayName || prev.name, avatar: firebaseUser.photoURL || prev.avatar }));
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSkillChange = (index: number, field: string, value: string) => {
    setSkills((prev) => prev.map((s, i) => i === index ? { ...s, [field]: value } : s));
  };
  const handleAddSkill = () => {
    setSkills((prev) => [...prev, { name: "", level: "Beginner", rating: 0, students: 0 }]);
  };
  const handleRemoveSkill = (index: number) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };
  const validateSkills = () => {
    for (const skill of skills) {
      if (!skill.name || !skill.level) {
        setSkillErrors("Skill name and level are required.");
        return false;
      }
    }
    setSkillErrors(null);
    return true;
  };
  const handleSaveSkills = async () => {
    if (!validateSkills() || !user) return;
    setSkillsLoading(true);
    await setDoc(doc(db, "users", user.uid), { skills }, { merge: true });
    setSkillsLoading(false);
  };

  const validate = () => {
    const newErrors: ProfileErrors = {};
    if (!profileData.name || profileData.name.trim() === "") newErrors.name = "Name is required.";
    if (!profileData.email || profileData.email.trim() === "") newErrors.email = "Email is required.";
    if (profileData.phone && !/^\+?\d[\d\s\-()]{7,}$/.test(profileData.phone)) newErrors.phone = "Invalid phone number.";
    if (profileData.website && !/^https?:\/\//.test(profileData.website)) newErrors.website = "Website must start with http:// or https://";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setIsEditing(false);
    if (user) {
      await setDoc(doc(db, "users", user.uid), profileData, { merge: true });
    }
=======
    bio: "Passionate learner and teacher. I love sharing knowledge about web development and learning new skills from others in the community.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  });

  const skills = [
    { name: "React Development", level: "Advanced", rating: 4.8, students: 15 },
    { name: "Guitar Lessons", level: "Intermediate", rating: 4.6, students: 8 },
    { name: "Photography", level: "Beginner", rating: 4.2, students: 3 },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log("Profile saved:", profileData);
>>>>>>> 0ce1cdd4107b5a3b523a7b613d4f6a9d2460daf0
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

<<<<<<< HEAD
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    );
  }

=======
>>>>>>> 0ce1cdd4107b5a3b523a7b613d4f6a9d2460daf0
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
        <p className="text-lg text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile Info</TabsTrigger>
          <TabsTrigger value="skills">My Skills</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Profile Info Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Personal Information</CardTitle>
              <Button
                variant={isEditing ? "default" : "outline"}
                size="sm"
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar Section */}
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={profileData.avatar} alt={profileData.name} />
                    <AvatarFallback className="text-2xl">
                      {profileData.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                  )}
                </div>

                {/* Form Fields */}
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
<<<<<<< HEAD
                      {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
=======
>>>>>>> 0ce1cdd4107b5a3b523a7b613d4f6a9d2460daf0
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
<<<<<<< HEAD
                      {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                      {errors.website && <div className="text-red-500 text-xs mt-1">{errors.website}</div>}
=======
>>>>>>> 0ce1cdd4107b5a3b523a7b613d4f6a9d2460daf0
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
<<<<<<< HEAD
                      {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
=======
>>>>>>> 0ce1cdd4107b5a3b523a7b613d4f6a9d2460daf0
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                My Skills & Expertise
<<<<<<< HEAD
                <Button variant="outline" size="sm" onClick={handleAddSkill} disabled={skillsLoading}>
                  Add New Skill
                </Button>
                <Button variant="default" size="sm" onClick={handleSaveSkills} disabled={skillsLoading} className="ml-2">
                  {skillsLoading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                  Save Skills
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {skillErrors && <div className="text-red-500 text-xs mb-2">{skillErrors}</div>}
=======
                <Button variant="outline" size="sm">
                  Add New Skill
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
>>>>>>> 0ce1cdd4107b5a3b523a7b613d4f6a9d2460daf0
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex-1">
<<<<<<< HEAD
                      <input
                        className="font-medium text-foreground bg-transparent border-b border-border focus:outline-none focus:border-primary mr-2"
                        value={skill.name}
                        onChange={e => handleSkillChange(index, 'name', e.target.value)}
                        placeholder="Skill Name"
                        disabled={skillsLoading}
                      />
                      <select
                        className="ml-2 px-2 py-1 border border-border rounded focus:outline-none focus:border-primary"
                        value={skill.level}
                        onChange={e => handleSkillChange(index, 'level', e.target.value)}
                        disabled={skillsLoading}
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                      <span className="text-sm text-muted-foreground ml-4">
                        ⭐ {skill.rating} rating
                      </span>
                      <span className="text-sm text-muted-foreground ml-4">
                        {skill.students} students
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleRemoveSkill(index)} disabled={skillsLoading}>Remove</Button>
=======
                      <h3 className="font-medium text-foreground">{skill.name}</h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge variant="secondary">{skill.level}</Badge>
                        <span className="text-sm text-muted-foreground">
                          ⭐ {skill.rating} rating
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {skill.students} students
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Remove</Button>
>>>>>>> 0ce1cdd4107b5a3b523a7b613d4f6a9d2460daf0
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive updates about your skill swaps</p>
                </div>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Privacy Settings</h3>
                  <p className="text-sm text-muted-foreground">Control who can see your profile</p>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Account Security</h3>
                  <p className="text-sm text-muted-foreground">Manage password and security</p>
                </div>
                <Button variant="outline" size="sm">Update</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
