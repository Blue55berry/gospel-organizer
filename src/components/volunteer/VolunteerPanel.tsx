import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Calendar, Send, Users, Gift, Bell, UserPlus, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const upcomingEvents = [
  {
    type: "Birthday",
    name: "Sarah Johnson",
    date: "Today",
    church: "St. Mary's Cathedral",
    message: "May God bless you with happiness, health, and His endless love on your special day."
  },
  {
    type: "Anniversary",
    name: "Michael & Anna Smith",
    date: "Tomorrow",
    church: "Grace Community",
    message: "May your love continue to grow stronger with each passing year, blessed by God's grace."
  },
  {
    type: "Birthday",
    name: "David Wilson",
    date: "In 2 days",
    church: "Faith Chapel",
    message: "Wishing you a blessed birthday filled with joy, peace, and God's abundant blessings."
  }
];

const messageTemplates = [
  {
    occasion: "Birthday",
    message: "May God bless you with happiness, health, and His endless love on your special day. Happy Birthday!"
  },
  {
    occasion: "Anniversary",
    message: "May your love continue to grow stronger with each passing year, blessed by God's grace. Happy Anniversary!"
  },
  {
    occasion: "Wedding",
    message: "May your marriage be blessed with love, joy, and companionship for all the years of your lives together."
  }
];

const churches = [
  "St. Mary's Cathedral",
  "Grace Community Church", 
  "Faith Chapel"
];

export function VolunteerPanel() {
  const { toast } = useToast();
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    phone: "",
    birthday: "",
    church: "",
    familyRole: "",
    address: "",
    weddingDate: "",
    spouseName: "",
    notes: ""
  });

  const handleAddMember = () => {
    if (!newMember.name || !newMember.church || !newMember.birthday) {
      toast({
        title: "Missing Information",
        description: "Please fill in the required fields (Name, Church, Birthday).",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Member Added Successfully",
      description: `${newMember.name} has been added to ${newMember.church}.`,
    });

    setNewMember({
      name: "",
      email: "",
      phone: "",
      birthday: "",
      church: "",
      familyRole: "",
      address: "",
      weddingDate: "",
      spouseName: "",
      notes: ""
    });
    setIsAddMemberOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-[var(--shadow-gentle)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-blessing" />
            Volunteer Dashboard
          </CardTitle>
          <CardDescription>
            Manage member events and send personalized blessings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-peace/30 border-peace">
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{upcomingEvents.length}</p>
                <p className="text-sm text-muted-foreground">Upcoming Events</p>
              </CardContent>
            </Card>
            <Card className="bg-blessing/20 border-blessing/30">
              <CardContent className="p-4 text-center">
                <Send className="w-8 h-8 text-blessing mx-auto mb-2" />
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Messages Sent Today</p>
              </CardContent>
            </Card>
            <Card className="bg-spiritual/20 border-spiritual/30">
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-spiritual mx-auto mb-2" />
                <p className="text-2xl font-bold">590</p>
                <p className="text-sm text-muted-foreground">Total Members</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[var(--gradient-divine)] shadow-[var(--shadow-blessed)]">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add New Member
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Church Member</DialogTitle>
                  <DialogDescription>
                    Enter the member's details and family information
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={newMember.name}
                      onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                      placeholder="Enter full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="church">Church *</Label>
                    <Select value={newMember.church} onValueChange={(value) => setNewMember({...newMember, church: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select church" />
                      </SelectTrigger>
                      <SelectContent>
                        {churches.map((church) => (
                          <SelectItem key={church} value={church}>{church}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newMember.email}
                      onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                      placeholder="member@email.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newMember.phone}
                      onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="birthday">Birthday *</Label>
                    <Input
                      id="birthday"
                      type="date"
                      value={newMember.birthday}
                      onChange={(e) => setNewMember({...newMember, birthday: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="familyRole">Family Role</Label>
                    <Select value={newMember.familyRole} onValueChange={(value) => setNewMember({...newMember, familyRole: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Father">Father</SelectItem>
                        <SelectItem value="Mother">Mother</SelectItem>
                        <SelectItem value="Child">Child</SelectItem>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Grandparent">Grandparent</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weddingDate">Wedding Date</Label>
                    <Input
                      id="weddingDate"
                      type="date"
                      value={newMember.weddingDate}
                      onChange={(e) => setNewMember({...newMember, weddingDate: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="spouseName">Spouse Name</Label>
                    <Input
                      id="spouseName"
                      value={newMember.spouseName}
                      onChange={(e) => setNewMember({...newMember, spouseName: e.target.value})}
                      placeholder="Spouse's full name"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={newMember.address}
                      onChange={(e) => setNewMember({...newMember, address: e.target.value})}
                      placeholder="Home address"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={newMember.notes}
                      onChange={(e) => setNewMember({...newMember, notes: e.target.value})}
                      placeholder="Additional notes about the member or family"
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddMember} className="bg-[var(--gradient-divine)]">
                    <Save className="w-4 h-4 mr-2" />
                    Add Member
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="alerts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="alerts">Today's Alerts</TabsTrigger>
          <TabsTrigger value="templates">Message Templates</TabsTrigger>
          <TabsTrigger value="history">Sent Messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="alerts" className="space-y-4">
          {upcomingEvents.map((event, index) => (
            <Card key={index} className="shadow-[var(--shadow-gentle)] hover:shadow-[var(--shadow-blessed)] transition-[var(--transition-sacred)]">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--gradient-blessing)] flex items-center justify-center">
                      <Gift className="w-6 h-6 text-blessing-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{event.name}</h3>
                        <Badge variant={event.type === "Birthday" ? "default" : "secondary"}>
                          {event.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {event.date}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{event.church}</p>
                      <div className="bg-muted/50 p-3 rounded-lg border-l-4 border-blessing">
                        <p className="text-sm italic">"{event.message}"</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit Message
                    </Button>
                    <Button size="sm" className="bg-[var(--gradient-blessing)] shadow-[var(--shadow-blessed)]">
                      <Send className="w-4 h-4 mr-2" />
                      Send Blessing
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4">
          {messageTemplates.map((template, index) => (
            <Card key={index} className="shadow-[var(--shadow-gentle)]">
              <CardHeader>
                <CardTitle className="text-lg">{template.occasion} Template</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
                  <p className="italic">"{template.message}"</p>
                </div>
                <Button variant="outline" size="sm" className="mt-3">
                  Edit Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">Message history will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}