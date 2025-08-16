import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { ChurchDashboard } from "@/components/church/ChurchDashboard";
import { MembersPanel } from "@/components/members/MembersPanel";
import { VolunteerPanel } from "@/components/volunteer/VolunteerPanel";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { LoginPage } from "@/components/auth/LoginPage";

const Index = () => {
  const [activePanel, setActivePanel] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");

  const handleLogin = (type: string) => {
    setUserType(type);
    setIsLoggedIn(true);
    // Set initial panel based on user type
    if (type === "admin") {
      setActivePanel("admin");
    } else if (type === "volunteer") {
      setActivePanel("volunteer");
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderActivePanel = () => {
    switch (activePanel) {
      case "dashboard":
        return <ChurchDashboard />;
      case "members":
        return <MembersPanel />;
      case "volunteer":
        return <VolunteerPanel />;
      case "admin":
        return <AdminPanel />;
      default:
        return <ChurchDashboard />;
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType("");
    setActivePanel("dashboard");
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-peaceful)] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Navigation 
          activePanel={activePanel} 
          onPanelChange={setActivePanel}
          notifications={3}
          userType={userType}
          onLogout={handleLogout}
        />
        {renderActivePanel()}
      </div>
    </div>
  );
};

export default Index;
