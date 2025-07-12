
import { ReactNode } from "react";
import { HorizontalNavbar } from "./HorizontalNavbar";

interface AuthenticatedLayoutProps {
  children: ReactNode;
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      {/* Horizontal Navigation Bar */}
      <HorizontalNavbar />
      
      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}
