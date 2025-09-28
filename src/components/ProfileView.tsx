import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { CreditCard as EditIcon, Save, X, MapPin, Briefcase, Calendar, Mail, Phone, Globe, Linkedin } from "lucide-react";

export function ProfileView() {
  const [isEditing, setIsEditing] = useState(false);
 const [profile, setProfile] = useState({
  firstName: "Amit",
  lastName: "Sharma",
  email: "amit.sharma@email.com",
  phone: "+91 98765 43210",
  graduationYear: "2018",
  degree: "Computer Science",
  company: "Infosys",
  position: "Software Engineer",
  location: "Bengaluru, Karnataka",
  bio: "Passionate about building scalable web applications and mentoring junior developers in India.",
  website: "https://rohitmhetre",
  linkedin: "https://linkedin.com/in/rohitmhetre02",
  skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
  interests: ["Machine Learning", "Open Source", "Mentoring"]
});


  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const addSkill = (skill: string) => {
    if (skill && !editedProfile.skills.includes(skill)) {
      setEditedProfile({ ...editedProfile, skills: [...editedProfile.skills, skill] });
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setEditedProfile({ ...editedProfile, skills: editedProfile.skills.filter(s => s !== skillToRemove) });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">Manage your profile information and preferences</p>
        </div>

        {/* Edit / Save Buttons */}
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" /> Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <EditIcon className="h-4 w-4 mr-1" /> Edit Profile
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="skills">Skills & Interests</TabsTrigger>
        </TabsList>

        {/* Personal Info */}
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic profile info</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="" alt={`${profile.firstName} ${profile.lastName}`} />
                  <AvatarFallback>{profile.firstName[0]}{profile.lastName[0]}</AvatarFallback>
                </Avatar>
                {isEditing && <Button variant="outline" size="sm">Change Photo</Button>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  {isEditing ? (
                    <Input value={editedProfile.firstName} onChange={(e) => setEditedProfile({ ...editedProfile, firstName: e.target.value })} />
                  ) : <p>{profile.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  {isEditing ? (
                    <Input value={editedProfile.lastName} onChange={(e) => setEditedProfile({ ...editedProfile, lastName: e.target.value })} />
                  ) : <p>{profile.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? <Input type="email" value={editedProfile.email} onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })} /> : <p>{profile.email}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? <Input value={editedProfile.phone} onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })} /> : <p>{profile.phone}</p>}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {isEditing ? <Input value={editedProfile.location} onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })} /> : <p>{profile.location}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Bio</Label>
                {isEditing ? <Textarea value={editedProfile.bio} onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })} rows={4} /> : <p>{profile.bio}</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Professional Info */}
        <TabsContent value="professional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>Career and education background</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? <Input value={editedProfile.degree} onChange={(e) => setEditedProfile({ ...editedProfile, degree: e.target.value })} /> : <p>{profile.degree}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Graduation Year</Label>
                  {isEditing ? (
                    <Select value={editedProfile.graduationYear} onValueChange={(v) => setEditedProfile({ ...editedProfile, graduationYear: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{Array.from({ length: 20 }, (_, i) => 2024 - i).map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}</SelectContent>
                    </Select>
                  ) : <p>Class of {profile.graduationYear}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Position</Label>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? <Input value={editedProfile.position} onChange={(e) => setEditedProfile({ ...editedProfile, position: e.target.value })} /> : <p>{profile.position}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  {isEditing ? <Input value={editedProfile.company} onChange={(e) => setEditedProfile({ ...editedProfile, company: e.target.value })} /> : <p>{profile.company}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Website</Label>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? <Input value={editedProfile.website} onChange={(e) => setEditedProfile({ ...editedProfile, website: e.target.value })} /> : <a href={profile.website} target="_blank" className="text-blue-600 hover:underline">{profile.website}</a>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>LinkedIn</Label>
                  <div className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? <Input value={editedProfile.linkedin} onChange={(e) => setEditedProfile({ ...editedProfile, linkedin: e.target.value })} /> : <a href={profile.linkedin} target="_blank" className="text-blue-600 hover:underline">LinkedIn Profile</a>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills & Interests */}
        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skills & Interests</CardTitle>
              <CardDescription>Technical skills and interests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Skills</Label>
                <div className="flex flex-wrap gap-2">
                  {(isEditing ? editedProfile.skills : profile.skills).map(skill => (
                    <Badge key={skill} className="flex items-center gap-1">
                      {skill}
                      {isEditing && <button onClick={() => removeSkill(skill)}><X className="h-3 w-3" /></button>}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <Input placeholder="Add skill" onKeyPress={(e) => { if (e.key === 'Enter') { addSkill(e.currentTarget.value); e.currentTarget.value = ''; } }} />
                    <Button variant="outline" onClick={(e) => { const input = e.currentTarget.previousElementSibling as HTMLInputElement; addSkill(input.value); input.value = ''; }}>Add</Button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Interests</Label>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map(interest => <Badge key={interest} variant="outline">{interest}</Badge>)}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
