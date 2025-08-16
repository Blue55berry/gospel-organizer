import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Shield, BarChart3, Database, Users, Church, Activity } from "lucide-react";

const systemStats = [
  { label: "Total Churches", value: "3", change: "+0%" },
  { label: "Total Members", value: "590", change: "+12%" },
  { label: "Active Volunteers", value: "8", change: "+2%" },
  { label: "Messages Sent", value: "1,247", change: "+18%" },
];

const recentActivity = [
  {
    action: "Member Added",
    user: "Volunteer Sarah",
    target: "John Smith - Grace Community",
    time: "2 hours ago"
  },
  {
    action: "Birthday Alert",
    user: "System",
    target: "Sarah Johnson - Birthday Reminder",
    time: "3 hours ago"
  },
  {
    action: "Message Sent",
    user: "Volunteer Mike",
    target: "Anniversary Blessing to Smith Family",
    time: "5 hours ago"
  },
  {
    action: "Church Updated",
    user: "Admin User",
    target: "St. Mary's Cathedral - Contact Info",
    time: "1 day ago"
  }
];

export function AdminPanel() {
  return (
    <div className="space-y-6">
      <Card className="shadow-[var(--shadow-gentle)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Admin Dashboard
          </CardTitle>
          <CardDescription>
            System overview and administrative controls
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {systemStats.map((stat, index) => (
              <Card key={index} className="bg-gradient-to-br from-card to-peace/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <Badge variant={stat.change.startsWith('+') ? "default" : "secondary"} className="text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="churches">Churches</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card className="shadow-[var(--shadow-gentle)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-[var(--transition-sacred)]">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <div>
                        <p className="font-medium text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">
                          by {activity.user} • {activity.target}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="churches">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Church className="w-5 h-5" />
                Church Management
              </CardTitle>
              <CardDescription>Add, edit, or remove churches from the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-muted-foreground">3 churches configured</p>
                <Button className="bg-[var(--gradient-divine)]">
                  Add New Church
                </Button>
              </div>
              <div className="text-center py-8 text-muted-foreground">
                <Church className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Church management interface coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                User Management
              </CardTitle>
              <CardDescription>Manage volunteers and admin access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>User management interface coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                System Settings
              </CardTitle>
              <CardDescription>Configure system preferences and messaging</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>System settings interface coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}