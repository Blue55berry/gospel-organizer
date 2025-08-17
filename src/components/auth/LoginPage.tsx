import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Church, Heart, Shield, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginPageProps {
  onLogin: (userType: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const { toast } = useToast();
  const [userType, setUserType] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    church: ""
  });

  const handleLogin = () => {
    if (!userType || !credentials.username || !credentials.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (userType === "volunteer" && !credentials.church) {
      toast({
        title: "Church Selection Required",
        description: "Please select your church.",
        variant: "destructive"
      });
      return;
    }

    // Simple authentication check
    const validCredentials = {
      admin: { username: "admin", password: "admin123" },
      volunteer: { username: "volunteer", password: "vol123" }
    };

    const isValid = 
      credentials.username === validCredentials[userType as keyof typeof validCredentials]?.username &&
      credentials.password === validCredentials[userType as keyof typeof validCredentials]?.password;

    if (isValid) {
      toast({
        title: "Login Successful",
        description: `Welcome to the ${userType} panel!`,
      });
      onLogin(userType);
    } else {
      toast({
        title: "Invalid Credentials",
        description: "Please check your username and password.",
        variant: "destructive"
      });
    }
  };

  const churches = [
    "St. Mary's Cathedral",
    "Grace Community Church", 
    "Faith Chapel"
  ];

  return (
    <div className="min-h-screen bg-[var(--gradient-peaceful)] flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-[var(--shadow-blessed)]">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-[var(--gradient-divine)] flex items-center justify-center mb-4">
            <Church className="w-8 h-8 text-spiritual-foreground" />
          </div>
          <CardTitle className="text-2xl bg-[var(--gradient-divine)] bg-clip-text text-transparent">
            Church Management System
          </CardTitle>
          <CardDescription>
            Sign in to access your panel
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="userType">User Type</Label>
            <Select value={userType} onValueChange={setUserType}>
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Admin
                  </div>
                </SelectItem>
                <SelectItem value="volunteer">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Volunteer
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {userType === "volunteer" && (
            <div className="space-y-2">
              <Label htmlFor="church">Church</Label>
              <Select value={credentials.church} onValueChange={(value) => setCredentials({...credentials, church: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your church" />
                </SelectTrigger>
                <SelectContent>
                  {churches.map((church) => (
                    <SelectItem key={church} value={church}>{church}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="pl-10"
              />
            </div>
          </div>

          <Button 
            onClick={handleLogin} 
            className="w-full bg-[var(--gradient-divine)] shadow-[var(--shadow-blessed)]"
            disabled={!userType}
          >
            Sign In
          </Button>

          <div className="text-center text-sm text-muted-foreground space-y-1">
            <p>Demo Credentials:</p>
            <p><strong>Admin:</strong> admin / admin123</p>
            <p><strong>Volunteer:</strong> volunteer / vol123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}