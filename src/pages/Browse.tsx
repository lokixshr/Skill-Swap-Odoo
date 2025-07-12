
import SkillCard from "@/components/SkillCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ArrowLeft, SlidersHorizontal, Coins, Users } from "lucide-react";
import { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();
  
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

  // Filter and sort skills
  const filteredSkills = useMemo(() => {
    let filtered = skills.filter(skill => {
      const matchesSearch = skill.skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           skill.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           skill.skill.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || 
                             skill.skill.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
      
      const matchesLevel = selectedLevel === "all" || 
                          skill.skill.level.toLowerCase() === selectedLevel;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.user.rating - a.user.rating;
        case 'name':
          return a.user.name.localeCompare(b.user.name);
        case 'skill':
          return a.skill.title.localeCompare(b.skill.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedLevel, sortBy]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedLevel("all");
    setSortBy("rating");
    toast({
      title: "Filters Cleared",
      description: "All search filters have been reset",
    });
  };

  const handleLoadMore = () => {
    toast({
      title: "Loading More Skills",
      description: "Fetching additional skill listings...",
    });
    // In a real app, this would load more data from the API
  };

  return (
    <div className="pt-6 pb-12 min-h-screen animate-fade-in">
      {/* Back to Home Button */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <NavLink to="/">
          <Button variant="ghost" className="group hover:bg-primary/5 transition-all duration-200">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Home
          </Button>
        </NavLink>
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Browse Skills
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Discover talented individuals ready to share their expertise
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>Showing {filteredSkills.length} of {skills.length} skills</span>
            </div>
            <div className="flex items-center gap-1">
              <Coins className="h-4 w-4 text-primary" />
              <span>5 coins per request</span>
            </div>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="bg-card border border-border rounded-lg shadow-soft mb-8 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Search & Filter</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                {showFilters ? 'Hide' : 'Show'} Filters
              </Button>
            </div>
            
            <div className={`grid grid-cols-1 gap-4 ${showFilters || 'md:grid-cols-5'} ${!showFilters && 'max-md:hidden'}`}>
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search skills, people, or categories..." 
                  className="pl-10 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="focus:ring-2 focus:ring-primary/20">
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
                <SelectTrigger className="focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="skill">Skill A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {(searchTerm || selectedCategory !== "all" || selectedLevel !== "all" || sortBy !== "rating") && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Search: "{searchTerm}"
                    </Badge>
                  )}
                  {selectedCategory !== "all" && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Category: {selectedCategory.replace('-', ' ')}
                    </Badge>
                  )}
                  {selectedLevel !== "all" && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Level: {selectedLevel}
                    </Badge>
                  )}
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleClearFilters}
                  className="hover:bg-destructive/5 hover:border-destructive/20 hover:text-destructive transition-all duration-200"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill, index) => (
              <div key={skill.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <SkillCard {...skill} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 animate-fade-in">
              <div className="bg-muted/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No skills found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or browse different categories
              </p>
              <Button 
                variant="outline" 
                onClick={handleClearFilters}
                className="hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                Clear Filters & Browse All
              </Button>
            </div>
          )}
        </div>

        {/* Load More */}
        {filteredSkills.length > 0 && (
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleLoadMore}
              className="hover:bg-primary hover:text-primary-foreground hover:shadow-md transition-all duration-300"
            >
              Load More Skills
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
