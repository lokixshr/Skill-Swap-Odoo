
import { NavLink, useLocation } from "react-router-dom";
import { Search, RefreshCcw, LayoutDashboard, User } from "lucide-react";

const navigationItems = [
  {
    title: "Browse Skills",
    url: "/browse",
    icon: Search,
  },
  {
    title: "My Swaps",
    url: "/swaps",
    icon: RefreshCcw,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
];

export function HorizontalNavbar() {
  const location = useLocation();

  return (
    <nav className="h-16 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="flex items-center justify-between h-full px-6">
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">SS</span>
          </div>
          <span className="font-semibold text-lg text-foreground">SkillSwap</span>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <NavLink
                key={item.title}
                to={item.url}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-md cursor-pointer
                  transition-all duration-200 font-medium
                  hover:bg-accent hover:text-accent-foreground 
                  hover:scale-[1.02] hover:shadow-sm
                  active:scale-[0.98] active:transition-transform active:duration-75
                  ${isActive ? 'bg-accent text-accent-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}
                `}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
