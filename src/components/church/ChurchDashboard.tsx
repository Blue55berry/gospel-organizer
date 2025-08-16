import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Gift, Heart, MapPin, Phone } from "lucide-react";

const mockChurches = [
  {
    id: 1,
    name: "St. Mary's Cathedral",
    location: "Downtown District",
    phone: "+1 (555) 123-4567",
    members: 245,
    upcomingEvents: 3
  },
  {
    id: 2,
    name: "Grace Community Church",
    location: "Riverside Area",
    phone: "+1 (555) 234-5678",
    members: 189,
    upcomingEvents: 2
  },
  {
    id: 3,
    name: "Faith Chapel",
    location: "Hill Valley",
    phone: "+1 (555) 345-6789",
    members: 156,
    upcomingEvents: 4
  }
];

const todaysBlessings = [
  { name: "Sarah Johnson", type: "Birthday", age: 34, church: "St. Mary's Cathedral" },
  { name: "Michael & Anna Smith", type: "Anniversary", years: 15, church: "Grace Community" },
  { name: "David Wilson", type: "Birthday", age: 67, church: "Faith Chapel" },
];

export function ChurchDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockChurches.map((church) => (
          <Card key={church.id} className="shadow-[var(--shadow-gentle)] hover:shadow-[var(--shadow-blessed)] transition-[var(--transition-sacred)]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-8 h-8 rounded-full bg-[var(--gradient-divine)] flex items-center justify-center">
                  <Heart className="w-4 h-4 text-spiritual-foreground" />
                </div>
                {church.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-1 text-sm">
                <MapPin className="w-3 h-3" />
                {church.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{church.members} Members</span>
                </div>
                <Badge variant="secondary">{church.upcomingEvents} Events</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-3 h-3" />
                {church.phone}
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Manage Church
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-[var(--shadow-gentle)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blessing" />
            Today's Blessings
          </CardTitle>
          <CardDescription>
            Birthdays and anniversaries to celebrate today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todaysBlessings.map((blessing, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-peace/30 border border-peace">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--gradient-blessing)] flex items-center justify-center">
                    <Gift className="w-5 h-5 text-blessing-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">{blessing.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {blessing.type === "Birthday" 
                        ? `${blessing.age}th Birthday` 
                        : `${blessing.years}th Anniversary`}
                    </p>
                    <p className="text-xs text-muted-foreground">{blessing.church}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="bg-blessing/10 border-blessing/30 hover:bg-blessing/20">
                  Send Blessing
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}