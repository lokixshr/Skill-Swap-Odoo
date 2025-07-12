import SkillCard from "@/components/SkillCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, ArrowLeft } from "lucide-react";
import { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  
  // Mock data - in a real app, this would come from an API
  const skills = [
    {
      id: 1,
      user: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b67c?w=100&h=100&fit=crop&crop=face",
        rating: 4.9,
      },
      skill: {
        title: "React Development",
        level: "Advanced" as const,
        category: "Web Development",
      },
      availability: "Weekends",
    },
    {
      id: 2,
      user: {
        name: "Marcus Johnson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        rating: 4.7,
      },
      skill: {
        title: "UI/UX Design",
        level: "Intermediate" as const,
        category: "Design",
      },
      availability: "Evenings",
    },
    {
      id: 3,
      user: {
        name: "Elena Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        rating: 4.8,
      },
      skill: {
        title: "Python Programming",
        level: "Advanced" as const,
        category: "Programming",
      },
      availability: "Flexible",
    },
    {
      id: 4,
      user: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        rating: 4.6,
      },
      skill: {
        title: "Digital Marketing",
        level: "Intermediate" as const,
        category: "Marketing",
      },
      availability: "Mornings",
    },
    {
      id: 5,
      user: {
        name: "Aisha Patel",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
        rating: 4.9,
      },
      skill: {
        title: "Data Science",
        level: "Advanced" as const,
        category: "Analytics",
      },
      availability: "Weekdays",
    },
    {
      id: 6,
      user: {
        name: "Tom Wilson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        rating: 4.5,
      },
      skill: {
        title: "Guitar Lessons",
        level: "Beginner" as const,
        category: "Music",
      },
      availability: "Weekends",
    },
  ];

  // Filter skills based on search and filter criteria
  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const matchesSearch = skill.skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           skill.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           skill.skill.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || 
                             skill.skill.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
      
      const matchesLevel = selectedLevel === "all" || 
                          skill.skill.level.toLowerCase() === selectedLevel;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchTerm, selectedCategory, selectedLevel]);

  return (
    <div className="pt-6 pb-12 min-h-screen">
      {/* Back to Home Button */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <NavLink to="/">
          <Button variant="ghost" className="group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Home
          </Button>
        </NavLink>
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Browse Skills</h1>
          <p className="text-lg text-muted-foreground">
            Discover talented individuals ready to share their expertise
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Showing {filteredSkills.length} of {skills.length} skills
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-soft mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search skills..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="web-development">Web Development</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="programming">Programming</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="analytics">Analytics</SelectItem>
                <SelectItem value="music">Music</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedLevel("all");
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill) => (
              <SkillCard key={skill.id} {...skill} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">No skills found matching your criteria</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedLevel("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-12">
          <Button variant="outline" size="lg">
            Load More Skills
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Browse;