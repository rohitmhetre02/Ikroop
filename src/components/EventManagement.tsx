import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Calendar, MapPin, Users, Clock, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useEvents } from "../hooks/useEvents";

export function EventManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const { events, loading, registerForEvent, unregisterFromEvent } = useEvents();

  const filteredEvents = events.filter(event => {
    if (activeTab === "all") return true;
    if (activeTab === "published") return event.status === "published";
    if (activeTab === "draft") return event.status === "draft";
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "default";
      case "draft": return "secondary";
      default: return "outline";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Social": return "bg-blue-100 text-blue-800";
      case "Professional": return "bg-green-100 text-green-800";
      case "Reunion": return "bg-purple-100 text-purple-800";
      case "Educational": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleRegisterForEvent = async (eventId: string) => {
    try {
      await registerForEvent(eventId, 'demo-user');
    } catch (error) {
      console.error('Failed to register for event:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1>Event Management</h1>
          <p className="text-muted-foreground">
            Loading events...
          </p>
        </div>
      </div>
    );
  }



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Event Management</h1>
          <p className="text-muted-foreground">
            Create, manage, and track alumni events and activities.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <Card key={event.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-48 h-32 bg-muted rounded-lg overflow-hidden">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold">{event.title}</h3>
                                <Badge variant={getStatusColor(event.status)}>
                                  {event.status}
                                </Badge>
                                <Badge className={getCategoryColor(event.category)}>
                                  {event.category}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                {event.description}
                              </p>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Button size="sm" variant="ghost">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(event.event_date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{event.event_time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span className="truncate">{event.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{event.attendees_count}/{event.max_capacity || 'Unlimited'}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="text-sm">
                              <span className="text-muted-foreground">Registration Fee: </span>
                              <span className="font-medium">
                                {event.registration_fee === 0 ? "Free" : `$${event.registration_fee}`}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                              {event.status === 'published' && (
                                <Button 
                                  size="sm" 
                                  onClick={() => handleRegisterForEvent(event.id)}
                                >
                                  Register
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Event Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Event Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Events</span>
                <span className="font-medium">{events.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Published</span>
                <span className="font-medium">
                  {events.filter(e => e.status === "published").length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Draft</span>
                <span className="font-medium">
                  {events.filter(e => e.status === "draft").length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Attendees</span>
                <span className="font-medium">
                  {events.reduce((sum, event) => sum + event.attendees_count, 0)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Registrations */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Registrations</CardTitle>
              <CardDescription>Latest event sign-ups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  No recent registrations to display
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}