import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { ChurchDashboard } from "@/components/church/ChurchDashboard";
import { MembersPanel } from "@/components/members/MembersPanel";
import { VolunteerPanel } from "@/components/volunteer/VolunteerPanel";
import { AdminPanel } from "@/components/admin/AdminPanel";

const Index = () => {
  const [activePanel, setActivePanel] = useState("dashboard");

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

  return (
    <div className="min-h-screen bg-[var(--gradient-peaceful)] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Navigation 
          activePanel={activePanel} 
          onPanelChange={setActivePanel}
          notifications={3}
        />
        {renderActivePanel()}
      </div>
    </div>
  );
};

export default Index;
