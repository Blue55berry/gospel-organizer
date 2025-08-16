import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Users, Heart, Calendar, Phone, Mail, MapPin, Search } from "lucide-react";

const churchData = {
  "St. Mary's Cathedral": {
    members: [
      {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 123-0001",
        birthday: "1989-03-15",
        familyRole: "Mother",
        address: "123 Oak Street, Downtown",
        familyMembers: ["John Johnson", "Emma Johnson", "Luke Johnson"]
      },
      {
        id: 2,
        name: "John Johnson",
        email: "john.johnson@email.com",
        phone: "+1 (555) 123-0002",
        birthday: "1985-07-22",
        familyRole: "Father",
        address: "123 Oak Street, Downtown",
        weddingDate: "2010-06-12",
        familyMembers: ["Sarah Johnson", "Emma Johnson", "Luke Johnson"]
      },
      {
        id: 3,
        name: "Emma Johnson",
        email: "emma.johnson@email.com",
        phone: "+1 (555) 123-0003",
        birthday: "2012-09-10",
        familyRole: "Child",
        address: "123 Oak Street, Downtown",
        familyMembers: ["Sarah Johnson", "John Johnson", "Luke Johnson"]
      }
    ]
  },
  "Grace Community Church": {
    members: [
      {
        id: 4,
        name: "Michael Smith",
        email: "michael.smith@email.com",
        phone: "+1 (555) 234-0001",
        birthday: "1978-11-08",
        familyRole: "Father",
        address: "456 Pine Avenue, Riverside",
        weddingDate: "2005-04-20",
        familyMembers: ["Anna Smith", "David Smith"]
      },
      {
        id: 5,
        name: "Anna Smith",
        email: "anna.smith@email.com",
        phone: "+1 (555) 234-0002",
        birthday: "1982-02-14",
        familyRole: "Mother",
        address: "456 Pine Avenue, Riverside",
        weddingDate: "2005-04-20",
        familyMembers: ["Michael Smith", "David Smith"]
      },
      {
        id: 6,
        name: "David Smith",
        email: "david.smith@email.com",
        phone: "+1 (555) 234-0003",
        birthday: "2008-12-03",
        familyRole: "Child",
        address: "456 Pine Avenue, Riverside",
        familyMembers: ["Michael Smith", "Anna Smith"]
      }
    ]
  },
  "Faith Chapel": {
    members: [
      {
        id: 7,
        name: "David Wilson",
        email: "david.wilson@email.com",
        phone: "+1 (555) 345-0001",
        birthday: "1955-06-18",
        familyRole: "Single",
        address: "789 Hill Road, Hill Valley",
        familyMembers: []
      },
      {
        id: 8,
        name: "Mary Thompson",
        email: "mary.thompson@email.com",
        phone: "+1 (555) 345-0002",
        birthday: "1960-08-25",
        familyRole: "Single",
        address: "321 Valley Street, Hill Valley",
        familyMembers: []
      }
    ]
  }
};

interface ChurchMembersViewProps {
  churchName: string;
  onBack: () => void;
}

export function ChurchMembersView({ churchName, onBack }: ChurchMembersViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<any>(null);
  
  const members = churchData[churchName as keyof typeof churchData]?.members || [];
  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card className="shadow-[var(--shadow-gentle)]">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Churches
            </Button>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                {churchName} Members
              </CardTitle>
              <CardDescription>
                Manage members for {churchName}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge variant="secondary" className="px-4 py-2">
              {members.length} Members
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-md transition-[var(--transition-sacred)] cursor-pointer"
                    onClick={() => setSelectedMember(member)}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-[var(--gradient-divine)] text-spiritual-foreground">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{member.name}</h3>
                      <Badge variant="outline" className="text-xs mb-2">
                        {member.familyRole}
                      </Badge>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(member.birthday).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {member.familyMembers.length} family members
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedMember && (
        <Card className="shadow-[var(--shadow-blessed)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback className="bg-[var(--gradient-divine)] text-spiritual-foreground">
                  {selectedMember.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {selectedMember.name}
            </CardTitle>
            <CardDescription>{selectedMember.familyRole} • {churchName}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="family">Family</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Birthday</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{new Date(selectedMember.birthday).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {selectedMember.weddingDate && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Wedding Anniversary</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Heart className="w-4 h-4 text-blessing" />
                        <span>{new Date(selectedMember.weddingDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="contact" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="w-4 h-4 text-primary" />
                      <span>{selectedMember.email}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>{selectedMember.phone}</span>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Address</label>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{selectedMember.address}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="family" className="space-y-4">
                {selectedMember.familyMembers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedMember.familyMembers.map((familyMember, index) => (
                      <Badge key={index} variant="secondary" className="justify-start p-2">
                        <Users className="w-3 h-3 mr-2" />
                        {familyMember}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No family members listed</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}