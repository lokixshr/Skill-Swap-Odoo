
import { NavLink, useLocation } from "react-router-dom";
import { Search, RefreshCcw, LayoutDashboard, User } from "lucide-react";
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
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SS</span>
            </div>
            {!isCollapsed && (
              <span className="font-semibold text-lg text-foreground">SkillSwap</span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="w-full justify-start"
                      tooltip={isCollapsed ? item.title : undefined}
                    >
                      <NavLink
                        to={item.url}
                        className="flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-200 w-full"
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!isCollapsed && <span>{item.title}</span>}
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
