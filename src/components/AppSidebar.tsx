
import { NavLink, useLocation } from "react-router-dom";
<<<<<<< HEAD
import { Search, RefreshCcw, LayoutDashboard, User, MessageCircle } from "lucide-react";
=======
import { Search, RefreshCcw, LayoutDashboard, User } from "lucide-react";
>>>>>>> 0ce1cdd4107b5a3b523a7b613d4f6a9d2460daf0
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

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
<<<<<<< HEAD
    title: "Messages",
    url: "/messages",
    icon: MessageCircle,
  },
  {
=======
>>>>>>> 0ce1cdd4107b5a3b523a7b613d4f6a9d2460daf0
    title: "Profile",
    url: "/profile",
    icon: User,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent>
        {/* Brand */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-2 cursor-default">
<<<<<<< HEAD
            <img src="/logo.svg" alt="SkillSwap Logo" className="w-8 h-8 rounded-lg" />
=======
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SS</span>
            </div>
>>>>>>> 0ce1cdd4107b5a3b523a7b613d4f6a9d2460daf0
            {!isCollapsed && (
              <span className="font-semibold text-lg text-foreground">SkillSwap</span>
            )}
          </div>
        </div>

        {/* Vertical Navigation at Top */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-1">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`
                        w-full justify-start cursor-pointer transition-all duration-200 
                        hover:bg-accent hover:text-accent-foreground 
                        hover:scale-[1.02] hover:shadow-sm
                        active:scale-[0.98] active:transition-transform active:duration-75
                        ${isActive ? 'bg-accent text-accent-foreground shadow-sm' : ''}
                      `}
                      tooltip={isCollapsed ? item.title : undefined}
                    >
                      <NavLink
                        to={item.url}
                        className="flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-200 w-full cursor-pointer"
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!isCollapsed && <span className="font-medium">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
