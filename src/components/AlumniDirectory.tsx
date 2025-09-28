import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Search, ListFilter as Filter, MapPin, Briefcase, Calendar, MessageSquare, UserPlus, Star } from "lucide-react";
import { useAlumni } from "../hooks/useAlumni";

interface AlumniProfile {
  id: string;
  first_name: string;
  last_name: string;
  graduation_year: number;
  degree: string;
  company: string | null;
  position: string | null;
  location: string | null;
  bio: string | null;
  avatar_url: string | null;
  industry?: { name: string };
  skills?: { id: string; name: string }[];
  linkedin_url?: string | null;
  email: string;
}

export function AlumniDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniProfile | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [connectionRequests, setConnectionRequests] = useState<string[]>([]);
  
  const { alumni, loading, searchAlumni } = useAlumni();

  // Get unique industries and years from the data
  const industries = [...new Set(alumni.map(person => person.industry?.name).filter(Boolean))];
  const years = [...new Set(alumni.map(person => person.graduation_year.toString()))].sort().reverse();

  useEffect(() => {
    searchAlumni(searchTerm, selectedIndustry, selectedYear);
  }, [searchTerm, selectedIndustry, selectedYear]);

  const handleConnect = (alumniId: string) => {
    setConnectionRequests(prev => [...prev, alumniId]);
    // In a real app, this would send a connection request to the backend
    alert("Connection request sent!");
  };

  const handleMessage = (alumni: AlumniProfile) => {
    // In a real app, this would open a messaging interface
    alert(`Opening message with ${alumni.first_name} ${alumni.last_name}`);
  };

  const handleCardClick = (alumni: AlumniProfile) => {
    setSelectedAlumni(alumni);
    setShowProfile(true);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedIndustry("");
    setSelectedYear("");
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1>Alumni Directory</h1>
          <p className="text-muted-foreground">
            Loading alumni directory...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Alumni Directory</h1>
        <p className="text-muted-foreground">
          Connect with fellow alumni and expand your professional network.
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, company, or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Graduation Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    Class of {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          {alumni.length} alumni found
        </p>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          More Filters
        </Button>
      </div>

      {/* Alumni Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {alumni.map((person) => (
          <Card key={person.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4 mb-4 cursor-pointer" onClick={() => handleCardClick(person)}>
                <Avatar className="h-16 w-16 rounded-full overflow-hidden">
  <AvatarImage
    src={person.avatar_url || undefined}
    alt={`${person.first_name} ${person.last_name}`}
    className="object-cover"
  />
  <AvatarFallback>
    {person.first_name[0]}{person.last_name[0]}
  </AvatarFallback>
</Avatar>

                <div className="flex-1 min-w-0 cursor-pointer">
                  <h3 className="font-semibold truncate cursor-pointer">{person.first_name} {person.last_name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Class of {person.graduation_year}
                  </p>
                  <p className="text-sm font-medium mt-1">{person.degree}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4" onClick={() => handleCardClick(person)}>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4 mr-2" />
                  <div>
                    <p className="font-medium text-foreground">{person.position || 'No position listed'}</p>
                    <p>{person.company || 'No company listed'}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {person.location || 'Location not specified'}
                </div>
              </div>

              <div className="mb-4" onClick={() => handleCardClick(person)}>
                <div className="flex flex-wrap gap-1">
                  {person.skills?.slice(0, 3).map((skill) => (
                    <Badge key={skill.id} variant="secondary" className="text-xs">
                      {skill.name}
                    </Badge>
                  ))}
                  {(person.skills?.length || 0) > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{(person.skills?.length || 0) - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleConnect(person.id);
                  }}
                  disabled={connectionRequests.includes(person.id)}
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  {connectionRequests.includes(person.id) ? 'Requested' : 'Connect'}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMessage(person);
                  }}
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {alumni.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No alumni found matching your search criteria.
          </p>
          <Button 
            variant="outline" 
            onClick={clearFilters}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Alumni Profile Dialog */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Alumni Profile</DialogTitle>
            <DialogDescription>
              Detailed information about this alumni
            </DialogDescription>
          </DialogHeader>
          
          {selectedAlumni && (
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={selectedAlumni.avatar_url || undefined} />
                  <AvatarFallback className="text-lg">
                    {selectedAlumni.first_name[0]}{selectedAlumni.last_name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{selectedAlumni.first_name} {selectedAlumni.last_name}</h2>
                  <p className="text-muted-foreground">Class of {selectedAlumni.graduation_year}</p>
                  <p className="font-medium">{selectedAlumni.degree}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Professional Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Briefcase className="h-4 w-4 mr-2" />
                      <div>
                        <p className="font-medium">{selectedAlumni.position || 'Position not specified'}</p>
                        <p className="text-muted-foreground">{selectedAlumni.company || 'Company not specified'}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      {selectedAlumni.location || 'Location not specified'}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    <p className="text-sm">{selectedAlumni.email}</p>
                    {selectedAlumni.linkedin_url && (
                      <a 
                        href={selectedAlumni.linkedin_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        LinkedIn Profile
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {selectedAlumni.bio && (
                <div>
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-sm">{selectedAlumni.bio}</p>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAlumni.skills?.map((skill) => (
                    <Badge key={skill.id} variant="secondary">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button 
                  className="flex-1"
                  onClick={() => handleConnect(selectedAlumni.id)}
                  disabled={connectionRequests.includes(selectedAlumni.id)}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  {connectionRequests.includes(selectedAlumni.id) ? 'Connection Requested' : 'Connect'}
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleMessage(selectedAlumni)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}