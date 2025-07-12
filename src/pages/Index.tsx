
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NavLink } from "react-router-dom";
import { Users, BookOpen, Clock, Star, ArrowRight, Globe, Shield } from "lucide-react";

const Index = () => {
  const features = [{
    icon: Users,
    title: "Connect & Learn",
    description: "Find skilled individuals ready to share their expertise in exchange for learning something new"
  }, {
    icon: BookOpen,
    title: "Diverse Skills",
    description: "From coding to cooking, music to marketing - discover endless learning opportunities"
  }, {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Learn at your own pace with flexible time slots that fit your busy lifestyle"
  }, {
    icon: Star,
    title: "Quality Assured",
    description: "Our rating system ensures you learn from verified, highly-rated skill sharers"
  }, {
    icon: Globe,
    title: "Global Community",
    description: "Connect with learners and teachers from around the world, expanding your network"
  }, {
    icon: Shield,
    title: "Safe & Secure",
    description: "Protected environment with verified profiles and secure communication channels"
  }];

  const stats = [{
    number: "10,000+",
    label: "Active Learners"
  }, {
    number: "5,000+",
    label: "Skills Available"
  }, {
    number: "50,000+",
    label: "Swaps Completed"
  }, {
    number: "4.9",
    label: "Average Rating"
  }];

  return (
    <div className="min-h-screen bg-background">
      {/* Brand Header */}
      <header className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-foreground">SkillSwap</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Learn Anything,
              <span className="text-primary"> Teach Everything</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join the world's largest skill-swapping community. Share what you know, 
              learn what you love, and build meaningful connections along the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NavLink to="/browse">
                <Button size="lg" className="group bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-3">
                  Browse Skills
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </NavLink>
              <NavLink to="/dashboard">
                <Button variant="outline" size="lg" className="px-8 py-3">
                  Sign Up Free
                </Button>
              </NavLink>
              <Button variant="ghost" size="lg" className="px-8 py-3">
                Explore
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose SkillSwap?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform makes skill sharing simple, safe, and rewarding for everyone involved
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-card-hover transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h3>
            <p className="text-lg text-muted-foreground">
              Getting started is simple and takes just a few minutes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              step: "01",
              title: "Create Your Profile",
              description: "List the skills you can teach and what you'd like to learn"
            }, {
              step: "02",
              title: "Find Your Match",
              description: "Browse available skills and connect with compatible partners"
            }, {
              step: "03",
              title: "Start Learning",
              description: "Schedule sessions and begin your skill exchange journey"
            }].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h4>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <ArrowRight className="h-6 w-6 text-muted-foreground mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-xl text-foreground mb-4">SkillSwap</div>
              <p className="text-muted-foreground">
                Connecting learners and teachers worldwide through meaningful skill exchanges.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-4">Platform</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Browse Skills</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-4">Support</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-4">Company</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 SkillSwap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
