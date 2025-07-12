import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const location = useLocation();
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/browse", label: "Browse Skills" },
    { to: "/swaps", label: "My Swaps" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  useEffect(() => {
    // Hide navbar when on browse page or if explicitly hidden
    setIsHidden(location.pathname === '/browse');
  }, [location.pathname]);

  const handleNavigation = (path: string) => {
    if (path === '/browse') {
      setIsHidden(true);
    }
  };

  const handleSignUpClick = () => {
    setIsHidden(true);
    // Add sign up logic here
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft transition-all duration-500 ease-in-out ${
      isHidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
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
                onClick={() => handleNavigation(item.to)}
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;