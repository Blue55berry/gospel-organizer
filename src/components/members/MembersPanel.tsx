import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserPlus, Users, Heart, Calendar, Phone, Mail } from "lucide-react";

const mockMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-0001",
    birthday: "1989-03-15",
    church: "St. Mary's Cathedral",
    familyRole: "Mother",
    familyId: "family_1",
    familyMembers: ["John Johnson", "Emma Johnson", "Luke Johnson"]
  },
  {
    id: 2,
    name: "John Johnson",
    email: "john.johnson@email.com",
    phone: "+1 (555) 123-0002",
    birthday: "1985-07-22",
    church: "St. Mary's Cathedral",
    familyRole: "Father",
    familyId: "family_1",
    weddingDate: "2010-06-12",
    familyMembers: ["Sarah Johnson", "Emma Johnson", "Luke Johnson"]
  },
  {
    id: 3,
    name: "Michael Smith",
    email: "michael.smith@email.com",
    phone: "+1 (555) 234-0001",
    birthday: "1978-11-08",
    church: "Grace Community",
    familyRole: "Father",
    familyId: "family_2",
    weddingDate: "2005-04-20",
    familyMembers: ["Anna Smith", "David Smith"]
  }
];

export function MembersPanel() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<typeof mockMembers[0] | null>(null);

  const filteredMembers = mockMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.church.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card className="shadow-[var(--shadow-gentle)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Church Members
          </CardTitle>
          <CardDescription>
            Manage member profiles and family connections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search members or churches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-[var(--gradient-divine)] shadow-[var(--shadow-blessed)]">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </div>

          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list">Member List</TabsTrigger>
              <TabsTrigger value="families">Families</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list" className="space-y-4">
              {filteredMembers.map((member) => (
                <Card key={member.id} className="hover:shadow-md transition-[var(--transition-sacred)] cursor-pointer"
                      onClick={() => setSelectedMember(member)}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback className="bg-[var(--gradient-divine)] text-spiritual-foreground">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.church}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {member.familyRole}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {member.familyMembers.length} family members
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Birthday: {new Date(member.birthday).toLocaleDateString()}
                        </div>
                        {member.weddingDate && (
                          <div className="flex items-center gap-1 mt-1">
                            <Heart className="w-3 h-3 text-blessing" />
                            Anniversary: {new Date(member.weddingDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="families">
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Family tree view coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
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
            <CardDescription>{selectedMember.church} • {selectedMember.familyRole}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Contact Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3 text-muted-foreground" />
                    {selectedMember.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-muted-foreground" />
                    {selectedMember.phone}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Family Members
                </h4>
                <div className="space-y-2">
                  {selectedMember.familyMembers.map((member, index) => (
                    <Badge key={index} variant="secondary" className="mr-2 mb-2">
                      {member}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}