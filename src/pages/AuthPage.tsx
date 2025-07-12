import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: handle sign in/up logic
    alert(`${isSignUp ? "Sign Up" : "Sign In"} with ${email}`);
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (error) {
      alert("Google sign-in failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md shadow-card">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold text-center mb-2 text-foreground">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-muted-foreground text-center mb-6">
            {isSignUp ? "Sign up to join SkillSwap" : "Sign in to your SkillSwap account"}
          </p>
          <Button
            type="button"
            className="w-full flex items-center justify-center gap-2 mb-6 border border-border bg-white text-foreground hover:bg-muted transition-all"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="h-5 w-5" />
            Continue with Google
          </Button>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {isSignUp && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary-hover transition-all">
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <span className="text-muted-foreground">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </span>
            <Button
              variant="link"
              className="ml-2 text-primary"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage; 