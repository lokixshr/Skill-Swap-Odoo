
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthenticatedLayout } from "./components/AuthenticatedLayout";
import Index from "./pages/Index";
import Browse from "./pages/Browse";
import Dashboard from "./pages/Dashboard";
import MySwaps from "./pages/MySwaps";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            {/* Landing page - no sidebar */}
            <Route path="/" element={<Index />} />
            
            {/* Authenticated pages - with sidebar */}
            <Route path="/browse" element={
              <AuthenticatedLayout>
                <Browse />
              </AuthenticatedLayout>
            } />
            <Route path="/swaps" element={
              <AuthenticatedLayout>
                <MySwaps />
              </AuthenticatedLayout>
            } />
            <Route path="/dashboard" element={
              <AuthenticatedLayout>
                <Dashboard />
              </AuthenticatedLayout>
            } />
            <Route path="/profile" element={
              <AuthenticatedLayout>
                <Profile />
              </AuthenticatedLayout>
            } />
            <Route path="/admin" element={
              <AuthenticatedLayout>
                <Admin />
              </AuthenticatedLayout>
            } />
            
            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
