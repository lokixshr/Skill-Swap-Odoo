
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/browse", label: "Browse Skills" },
    { to: "/swaps", label: "My Swaps" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  useEffect(() => {
    // Auto-hide on browse page
    setIsHidden(location.pathname === '/browse');
  }, [location.pathname]);

  const handleSmartNavigation = (path: string) => {
    // Smart hiding for specific routes
    if (path === '/browse') {
      setIsHidden(true);
      setTimeout(() => navigate(path), 200);
    } else {
      navigate(path);
    }
  };

  const handleBrowseSkillsClick = () => {
    setIsHidden(true);
    setTimeout(() => navigate('/browse'), 300);
  };

  const handleSignUpClick = () => {
    setIsHidden(true);
    // Add sign up logic here - could navigate to signup page or open modal
    setTimeout(() => {
      // For now, just show a notification and restore navbar
      setIsHidden(false);
    }, 2000);
  };

  const handleExploreSkillsClick = () => {
    setIsHidden(true);
    setTimeout(() => navigate('/browse'), 300);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft transition-all duration-500 ease-in-out ${
      isHidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2" onClick={() => setIsHidden(false)}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SS</span>
            </div>
            <span className="font-semibold text-lg text-foreground">SkillSwap</span>
          </NavLink>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => handleSmartNavigation(item.to)}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:font-medium"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <div className="absolute -bottom-6 left-0 right-0 h-0.5 bg-primary rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
              Profile
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignUpClick}>
              Sign Up Free
            </Button>
          </div>

          {/* Expose handlers for external use */}
          <div className="hidden">
            <button onClick={handleBrowseSkillsClick} data-testid="browse-skills-trigger" />
            <button onClick={handleExploreSkillsClick} data-testid="explore-skills-trigger" />
          </div>
        </div>
      </div>
    </nav>
  );
};

// Export handlers for use in other components
export const useNavbarControls = () => {
  const navigate = useNavigate();
  
  const triggerBrowseSkills = () => {
    // Trigger navbar hide and navigate
    const trigger = document.querySelector('[data-testid="browse-skills-trigger"]') as HTMLButtonElement;
    if (trigger) trigger.click();
  };

  const triggerExploreSkills = () => {
    const trigger = document.querySelector('[data-testid="explore-skills-trigger"]') as HTMLButtonElement;  
    if (trigger) trigger.click();
  };

  return { triggerBrowseSkills, triggerExploreSkills };
};

export default Navbar;
