import { Button } from "./button";
import { Card } from "./card";
import { Badge } from "./badge";
import { Bell, Church, Users, UserPlus, Settings } from "lucide-react";

interface NavigationProps {
  activePanel: string;
  onPanelChange: (panel: string) => void;
  notifications: number;
}

export function Navigation({ activePanel, onPanelChange, notifications }: NavigationProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Church },
    { id: "members", label: "Members", icon: Users },
    { id: "volunteer", label: "Volunteer Panel", icon: UserPlus },
    { id: "admin", label: "Admin Panel", icon: Settings },
  ];

  return (
    <Card className="p-4 shadow-[var(--shadow-gentle)] bg-gradient-to-r from-card to-peace/30">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--gradient-divine)] flex items-center justify-center">
            <Church className="w-5 h-5 text-spiritual-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-[var(--gradient-divine)] bg-clip-text text-transparent">
              Church Management
            </h1>
            <p className="text-sm text-muted-foreground">Faith • Family • Fellowship</p>
          </div>
        </div>
        <div className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          {notifications > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs">
              {notifications}
            </Badge>
          )}
        </div>
      </div>
      
      <nav className="flex gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activePanel === item.id ? "default" : "ghost"}
              onClick={() => onPanelChange(item.id)}
              className={`flex items-center gap-2 transition-[var(--transition-sacred)] ${
                activePanel === item.id 
                  ? "bg-[var(--gradient-divine)] shadow-[var(--shadow-blessed)]" 
                  : "hover:bg-peace/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </Card>
  );
}