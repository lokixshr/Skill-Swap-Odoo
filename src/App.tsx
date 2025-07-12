
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
<<<<<<< HEAD
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
>>>>>>> 0ce1cdd4107b5a3b523a7b613d4f6a9d2460daf0
import { AuthenticatedLayout } from "./components/AuthenticatedLayout";
import Index from "./pages/Index";
import Browse from "./pages/Browse";
import Dashboard from "./pages/Dashboard";
import MySwaps from "./pages/MySwaps";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
<<<<<<< HEAD
import AuthPage from "./pages/AuthPage";
import UserProfile from "./pages/UserProfile";
import Messages from "./pages/Messages";
=======
>>>>>>> 0ce1cdd4107b5a3b523a7b613d4f6a9d2460daf0

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
<<<<<<< HEAD
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/explore" element={<Navigate to="/dashboard" />} />
=======
>>>>>>> 0ce1cdd4107b5a3b523a7b613d4f6a9d2460daf0
            
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
<<<<<<< HEAD
            <Route path="/messages" element={
              <AuthenticatedLayout>
                <Messages />
              </AuthenticatedLayout>
            } />
            <Route path="/messages/:userId" element={
              <AuthenticatedLayout>
                <Messages />
              </AuthenticatedLayout>
            } />
=======
>>>>>>> 0ce1cdd4107b5a3b523a7b613d4f6a9d2460daf0
            <Route path="/admin" element={
              <AuthenticatedLayout>
                <Admin />
              </AuthenticatedLayout>
            } />
<<<<<<< HEAD
            <Route path="/user/:userId" element={<UserProfile />} />
=======
>>>>>>> 0ce1cdd4107b5a3b523a7b613d4f6a9d2460daf0
            
            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
